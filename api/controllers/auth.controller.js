const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const UserModel = require('../models/user.model')

async function signup (req, res) {
  try {
    req.body.password = bcrypt.hashSync(req.body.password, 10)
    const user = await UserModel.create(req.body)
    const payload = { email: user.email }

    const token = jwt.sign(payload, process.env.SECRET, { expiresIn: '1h' })

    res.status(200).json({ email: user.email, token }) // token: token
  } catch (error) {
    res.status(400).send(error)
    //throw new Error(`Error creating user: ${error}`)
  }
}

async function login (req, res) {
  try {
    const user = await UserModel.findOne({ email: req.body.email })

    if (!user) {
      res.status(400).send('Email or password incorrect')
      return
    }

    bcrypt.compare(req.body.password, user.password, (err, result) => {
      if (err) throw new Error(err)

      if (!result) {
        return res.json({ error: 'Email or password incorrect' })
      }

      const token = jwt.sign({ email: user.email }, process.env.SECRET, { expiresIn: '1h' })

      res.status(200).json({ email: user.email, token })
    })
  } catch (error) {
    res.status(500).send('Error logging user')
    //throw new Error(`Error logging user: ${error}`)
  }
}


module.exports = {
  signup,
  login
}
