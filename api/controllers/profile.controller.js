const Ships = require('../models/ship.model')
const Users = require("../models/user.model");

function getInfo(req, res) {
    Users.findOne({email: `${res.locals.user.email}`})
    .populate('ships')
    .then(user => res.json(user))
    .catch((err) => res.json(err));
}

function getShips(req, res) {
    Users.findOne({email: `${res.locals.user.email}`})
    .populate('ships')
    .then(user => res.json(user.ships))
    .catch((err) => res.json(err));
}

function addShip(req, res) {
    Users.findOne({ email: `${res.locals.user.email}` })
      .then((user) => {
        req.body['owner'] = user.id
        Ships.create(req.body)
          .then((ship) => {
            user.ships.push(ship.id)
            user.save()
            res.send('Ship added successfuly!')
          })
          .catch((err) => res.json(err));
      })
      .catch((err) => res.json(err))
  }

function updateProfile(req, res) {
    console.log(res.locals.user)
      Users.findOneAndUpdate({email: `${res.locals.user.email}`}, req.body)
    .then(() => res.json('User updated'))
    .catch((err) => res.json(err));
}

module.exports = {
    getInfo,
    getShips,
    addShip,
    updateProfile
  };