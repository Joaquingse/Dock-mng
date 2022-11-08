const router = require('express').Router()

const {
  authUser,
  checkAdmin
} = require('../utils') 

const {
    getDocks,
    getAvailableDocks,
    addDock,
    reserveDock,
    updateDock
  } = require('../controllers/dock.controller')

router.get('/', authUser, checkAdmin, getDocks)
router.get('/available', getAvailableDocks)
router.post('/', authUser, checkAdmin, addDock)
router.put('/reserve', authUser, reserveDock)
router.put('/:id', authUser, checkAdmin, updateDock)

module.exports = router