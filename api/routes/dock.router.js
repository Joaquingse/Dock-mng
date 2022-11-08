const router = require('express').Router()

const {
  authUser,
  checkAdmin
} = require('../utils') 

const {
    getDocks,
    getAvailableDocks,
    addDock,
    updateDock
  } = require('../controllers/dock.controller')

router.get('/', authUser, checkAdmin, getDocks)
router.get('/available', getAvailableDocks)
router.post('/', authUser, checkAdmin, addDock)
router.put('/:id', authUser, checkAdmin, updateDock)

module.exports = router