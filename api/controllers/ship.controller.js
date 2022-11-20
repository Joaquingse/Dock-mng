const Ships = require("../models/ship.model");
const Users = require("../models/user.model");


function getAllShips(req, res) {
  Ships.find(req.query)
    .populate('owner')
    .then((ships) => res.json(ships))
    .catch((err) => res.json(err));
}

function getUser(req, res) {
  Users.findById(req.params.id)
    .then((user) => res.json(user))
    .catch((err) => res.json(err));
}

function addShip(req, res) {
  Ships.create(req.body)
    .then((ship) => {
       Users.findById(req.body.owner)
        .populate('ships')
        .then(user => {
          user.ships.push(ship.id)
          user.save()
          res.json(ship)
        })
        .catch((err) => res.json(err));
    })
    .catch((err) => res.json(err));
}

function updateShip(req, res) {
  Ships.findByIdAndUpdate(req.params.id, req.body, {new: true})
    .then(ship => res.json(ship))
    .catch((err) => res.json(err));
}

function deleteShip(req, res) {
  Ships.findByIdAndDelete(req.params.id)
    .then((ship) => {
      Users.findById(ship.owner)
        .then(user => {
          let index = user.ships.indexOf(ship.id)
          user.ships.splice(index, 1)
          user.save()
          res.json(ship)
        })
        .catch((err) => res.json(err));
    })
    .catch((err) => res.json(err));
}


module.exports = {
    getAllShips,
    getUser,
    addShip,
    updateShip,
    deleteShip
};