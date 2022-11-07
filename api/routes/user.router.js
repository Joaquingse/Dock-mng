const router = require('express').Router()

const {
  authUser,
  checkAdmin
} = require('../utils') 

const {
    getAllOwners,
    getUser,
    createUser,
    updateUser,
    deleteUser,
  } = require('../controllers/user.controller')

router.get('/', authUser, checkAdmin, getAllOwners)
router.get('/:id', authUser, checkAdmin, getUser)
router.post('/', authUser, checkAdmin, createUser)
router.delete('/:id', authUser, checkAdmin, deleteUser)
router.put('/:id', authUser, checkAdmin, updateUser)

module.exports = router