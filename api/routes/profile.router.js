const router = require('express').Router()

const { authUser } = require('../utils') 

const {
    getInfo,
    getShips,
    addShip,
    updateProfile
  } = require('../controllers/profile.controller')

router.get('/', authUser, getInfo)
router.get('/ships', authUser, getShips)
router.post('/ships', authUser, addShip)
router.put('/update', authUser, updateProfile)
  


  module.exports = router