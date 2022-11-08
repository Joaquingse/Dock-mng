const router = require('express').Router()

const { authUser } = require('../utils') 

const {
    getInfo,
    getShips,
    getBills,
    addShip,
    pay,
    updateProfile,
    updateOwnShip
  } = require('../controllers/profile.controller')

router.get('/', authUser, getInfo)
router.get('/ships', authUser, getShips)
router.get('/bills', authUser, getBills)
router.post('/ships', authUser, addShip)
router.put('/pay', authUser, pay)
router.put('/updateProfile', authUser, updateProfile)
router.put('/updateShip/:id', authUser, updateOwnShip)


module.exports = router