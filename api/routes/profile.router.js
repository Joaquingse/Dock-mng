const router = require('express').Router()

const { authUser } = require('../utils') 

const {
    getInfo,
    getShips,
    addShip,
    updateProfile,
    updateOwnShip
  } = require('../controllers/profile.controller')

router.get('/', authUser, getInfo)
router.get('/ships', authUser, getShips)
router.post('/ships', authUser, addShip)
router.put('/updateProfile', authUser, updateProfile)
router.put('/updateShip/:id', authUser, updateOwnShip)
  


  module.exports = router