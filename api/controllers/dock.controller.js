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

async function reserveDock(req, res) {

    let ship = await Ships.findOne({name: req.body.ship})
    let dock = await Docks.findOne({dock: req.body.dock})

    let reservation = req.body
    reservation.quantity = (new Date(reservation.outDate).getTime() - new Date(reservation.inDate).getTime()) / (1000 * 3600 * 24) * 10, // CALCULAR POR DÍAS
    reservation.owner = res.locals.user.id
    reservation.ship = ship.id;
    reservation.dock = dock.id

    let checkRes = await Payments.findOne(reservation)

    let wantedInDate = reservation.inDate
    let wantedOutDate = reservation.outDate
    
    let existingRes = await Payments.find({ $and: [{dock: dock.id}, { $or: [
        { $and: [{outDate: {$gte: wantedInDate}}, {outDate: {$lte: wantedOutDate}}] }, 
        { $and: [{inDate: {$gte: wantedInDate}}, {inDate: {$lte: wantedOutDate}}] }, 
        { $and: [{inDate: {$gte: wantedInDate}}, {outDate: {$lte: wantedOutDate}}] }, 
        { $and: [{inDate: {$lte: wantedInDate}}, {outDate: {$gte: wantedOutDate}}] }
    ]} ]})

    if (checkRes) {
        res.json('This reservation is already done')
    }
    else if (existingRes.length !== 0) {
        res.json('This dock is is not available those days. Please, change days or dock')
    }
    else {
        reservation.resDate = Date()
        let reserve = await Payments.create(reservation)
        res.json(reserve) 
    }
}

/* function reserveDock(req, res) {

    let reservation = req.body
    reservation.quantity = (new Date(reservation.outDate).getTime() - new Date(reservation.inDate).getTime()) / (1000 * 3600 * 24) * 10, // CALCULAR POR DÍAS
    reservation.owner = res.locals.user.id

    Ships.findOne({name: req.body.ship})
        .then(ship => {
            reservation.ship = ship.id;
            Docks.findOne({dock: req.body.dock})
                .then(dock =>{
                    reservation.dock = dock.id
                    console.log(reservation)
                    Payments.findOne(reservation)
                        .then(payment => {
                            console.log(payment)
                            if (!payment) {
                                reservation.resDate = Date()
                                Payments.create(reservation)
                                    .then(payment => res.json(payment))
                                    .catch()
                            }
                            else {
                                res.json('This reservation is already done')
                            }
                        }) 
                        .catch((err) => res.json(err))
                }) 
                .catch((err) => res.json(err))            
        }) 
        .catch((err) => res.json(err))
} */

function updateDock(req, res) {
    Docks.findByIdAndUpdate(req.params.id, req.body, {new: true})
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