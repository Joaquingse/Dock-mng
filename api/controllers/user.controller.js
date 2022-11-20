const Users = require("../models/user.model");
const bcrypt = require('bcrypt') // importamos para encryptar el password
const Payments = require('../models/payment.model')


function getAllUsers(req, res) {
  Users.find(req.query)
    .populate('ships')
    .then((users) => {
        res.json(users);
    })
    .catch((err) => res.json(err));
}

function getWorkers(req, res) {
  Users.find(req.query)
    .then((users) => {
        let workers = users.filter(user => user.role === 'worker')
        res.json(workers);
    })
    .catch((err) => res.json(err));
}

function getUser(req, res) {
  Users.findById(req.params.id)
    .then((user) => res.json(user))
    .catch((err) => res.json(err));
}

function createUser(req, res) {
    // enctriptamos el password al crear el user
  req.body.password = bcrypt.hashSync(req.body.password, 10)
  Users.create(req.body)
    .then((user) => res.json(user))
    .catch((err) => res.json(err));
}

function updateUser(req, res) {
  // enctriptamos el password al actualizarlo
  if(req.body.password) {
    req.body.password = bcrypt.hashSync(req.body.password, 10)
  }
  Users.findByIdAndUpdate(req.params.id, req.body, {new: true})
    .populate('ships')
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
}

function deleteUser(req, res) {
  Users.findByIdAndDelete(req.params.id)
    .populate('ships')
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
}


module.exports = {
  getAllUsers,
  getWorkers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
};