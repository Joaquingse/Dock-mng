const router = require('express').Router()

const {
  authUser,
  checkMaintenance,
  checkAdmin
} = require('../utils') 

const {
    getDocks,
    getAvailableDocks,
    addDock,
    reserveDock,
    updateDock
  } = require('../controllers/dock.controller')

router.get('/', authUser, checkMaintenance, getDocks)
router.post('/available', getAvailableDocks)
router.post('/', authUser, checkAdmin, addDock)
router.put('/reserve', authUser, reserveDock)
router.put('/:id', authUser, checkAdmin, updateDock)

module.exports = router