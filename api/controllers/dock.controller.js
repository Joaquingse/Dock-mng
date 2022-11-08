const Docks = require('../models/dock.model')

function getDocks(req, res) {
    Docks.find(req.query)
        .then(dock => res.json(dock))
        .catch((err) => res.json(err));
}

function getAvailableDocks(req, res) {
    Docks.find({occuppied: false}, {dock: 1, _id:0})
        .then(dock => res.json(dock))
        .catch((err) => res.json(err));
}

function addDock(req, res) {
    Docks.create(req.body)
        .then(dock => res.json(dock))
        .catch((err) => res.json(err));
}

function updateDock(req, res) {
    Docks.findByIdAndUpdate(req.params.id, req.body)
      .then((result) => res.json(result))
      .catch((err) => res.json(err));
  }

module.exports = {
    getDocks,
    getAvailableDocks,
    addDock,
    updateDock
  };