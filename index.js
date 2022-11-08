require('dotenv').config()

const express = require('express')

const cors = require('cors')
const mongoose = require('mongoose')
const morgan = require('morgan')

;(async function () {
  // MONGOOSE
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      dbName: process.env.MONGO_DB || 'port-db'
    })
    console.log('Connected to DB')
  } catch (err) {
    throw new Error(`Error connecting to DB: ${err}`)
  }

  try {
    // ADDING MIDDLEWARES & ROUTER
    const app = express()
      .use(cors())
      .use(morgan('combined'))
      .use(express.json())
      .use('/api', require('./api/routes'))

    // Init server
    const PORT = process.env.PORT || 8080
    app.listen(PORT, (err) => {
      if (err) {
        throw new Error(err)
      }
      console.info('>'.repeat(40))
      console.info('💻  Reboot Server Live')
      console.info(`📡  PORT: http://localhost:${PORT}`)
      console.info('>'.repeat(40) + '\n')
    })
  } catch (error) {
    throw new Error(error)
  }
})()