const Ships = require('../models/ship.model')
const Users = require("../models/user.model");
const Payments = require("../models/payment.model");

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

function getOwnBills(req, res) {
  Payments.find(req.query)
  .populate('dock')
  .then(bills => {
    let userBills = bills.filter(bill => bill.owner.toString() === res.locals.user.id)
    res.json(userBills)
  })
  .catch()
}

function addShip(req, res) {
    Users.findOne({ email: `${res.locals.user.email}` })
      .then((user) => {
        req.body['owner'] = user.id
        Ships.create(req.body)
          .then((ship) => {
            user.ships.push(ship.id)
            user.save()
            res.send()
          })
          .catch((err) => res.json(err));
      })
      .catch((err) => res.json(err))
}

function pay(req, res) {
  Payments.findOne({ $and: [{owner: `${res.locals.user.id}`}, {id: `${req.body.paymentId}`}], {new: true})
        .then(bill => {
            bill.paid = true
            bill['payDate'] = Date()
            bill.save()
            res.json(bill)
        })
        .catch()
}

function updateProfile(req, res) {
  Users.findOneAndUpdate({email: `${res.locals.user.email}`}, req.body, {new: true})
    .populate('ships')
    .then((user) => res.json(user))
    .catch((err) => res.json(err));
}

function updateOwnShip(req, res) {
  Users.findOne({email: `${res.locals.user.email}`})
    .then(user => {
      if(!user.ships.includes(req.params.id)) {
        return res.status(401).send('You can not manage this ship data')
      }
      Ships.findByIdAndUpdate(req.params.id, req.body, {new: true})
        .then(ship => {
          console.log(ship)
          res.json(ship)
        })
        .catch((err) => res.json(err))
    })
    .catch((err) => res.json(err))
}

module.exports = {
    getInfo,
    getShips,
    getOwnBills,
    addShip,
    pay,
    updateProfile,
    updateOwnShip
  };
