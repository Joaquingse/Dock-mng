const jwt = require('jsonwebtoken')
const UserModel = require('../models/user.model')

// Authenticate Middleware
function authUser (req, res, next) {
  if (!req.headers.token) {
    res.status(403).json({ error: 'No Token found' })
  } else {
    jwt.verify(req.headers.token, process.env.SECRET, (err, token) => {
      if (err) { res.status(403).json({ error: 'Token not valid' }) }

      UserModel.findOne({ email: token.email })
        .then(user => {
          res.locals.user = user
          next()
        })
    })
  }
}

function checkAdmin(req, res, next) {
  if (res.locals.user.role !== 'admin') { 
      return res.status(401).send('User not authorized')
  } else {
      next()
  }
}


module.exports = {
  authUser,
  checkAdmin
}
