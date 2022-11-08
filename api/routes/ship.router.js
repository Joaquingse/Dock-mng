const router = require('express').Router()

const {
  authUser,
  checkAdmin
} = require('../utils') 

const {
    getAllShips,
    addShip,
    updateShip,
    deleteShip,
  } = require('../controllers/ship.controller')

router.get('/', authUser, checkAdmin, getAllShips)
router.post('/', authUser, checkAdmin, addShip)
router.delete('/:id', authUser, checkAdmin, deleteShip)
router.put('/:id', authUser, checkAdmin, updateShip)

module.exports = router