const router = require('express').Router()

const {
    getAllUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
  } = require('../controllers/user.controller')

router.get('/', getAllUsers)
router.get('/:id', getUser)
router.post('/', createUser)
router.delete('/:id', deleteUser)
router.put('/:id', updateUser)

module.exports = router