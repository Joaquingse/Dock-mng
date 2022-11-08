const router = require('express').Router()

const {
  authUser,
  checkAdmin
} = require('../utils') 

const {
    getAllUsers,
    getDebitors,
    getUser,
    createUser,
    updateUser,
    deleteUser,
  } = require('../controllers/user.controller')

router.get('/', authUser, checkAdmin, getAllUsers)
router.get('/debitors', authUser, checkAdmin, getDebitors)
router.get('/:id', authUser, checkAdmin, getUser)
router.post('/', authUser, checkAdmin, createUser)
router.delete('/:id', authUser, checkAdmin, deleteUser)
router.put('/:id', authUser, checkAdmin, updateUser)

module.exports = router