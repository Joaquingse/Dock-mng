const router = require('express').Router()

const {
    authUser,
    checkFinances
} = require('../utils') 

const {
    getPayments,
    getIncoming,
    getQueryInc
} = require('../controllers/pay.controller.js')

router.get('/', authUser, checkFinances, getPayments)
router.get('/incoming', authUser, checkFinances, getIncoming)
router.get('/incoming/:date', authUser, checkFinances, getQueryInc)

module.exports = router
