const router = require('express').Router()



const usersRouter = require('./user.router')
const shipsRouter = require('./ship.router')
const authRouter = require('./auth.router')
const profileRouter = require('./profile.router')


router.use('/users', usersRouter)
router.use('/ships', shipsRouter)
router.use('/auth', authRouter)
router.use('/profile', profileRouter)


module.exports = router