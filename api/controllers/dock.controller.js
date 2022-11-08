const Docks = require('../models/dock.model')
const Ships = require('../models/ship.model')
const Payments = require('../models/payment.model')

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

function reserveDock(req, res) {
    let reserve = req.body
    Ships.findOne({name: req.body.ship})
        .then(ship => {
            reserve.ship = ship.id;
            reserve['occuppied'] = true;
            Docks.findOneAndUpdate({dock: req.body.dock}, reserve)
                .then(dock =>{
                    Payments.create({
                        quantity: 500, // CALCULAR POR DÍAS
                        dock: dock.id,
                        owner: res.locals.user.id,
                        resDate: Date()
                    })
                    .then(res.json(dock))
                    .catch()    
                }) 
                .catch()
            console.log(ship)
            console.log(ship.owner)
            
        }) 
        .catch()
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
    reserveDock,
    updateDock
  };