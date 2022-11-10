const router = require('express').Router()

const {
  authUser,
  checkRRHH,
  checkAdmin
} = require('../utils') 

const {
    getAllUsers,
    getWorkers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
  } = require('../controllers/user.controller')

router.get('/', authUser, checkAdmin, getAllUsers)
router.get('/workers', authUser, checkRRHH, getWorkers)
router.get('/:id', authUser, checkAdmin, getUser)
router.post('/', authUser, checkAdmin, createUser)
router.delete('/:id', authUser, checkAdmin, deleteUser)
router.put('/:id', authUser, checkAdmin, updateUser)

module.exports = router