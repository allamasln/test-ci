require('dotenv').config()
const config = require('config')
const winston = require('winston')

const express = require('express')

const app = express()

require('./startup/logger')()
require('./startup/config')()
require('./startup/bd')()
require('./startup/routes')(app)

const PORT = process.env.PORT || config.get('PORT')

app.listen(PORT, () =>
	winston.info(`Server running on  http://localhost:${PORT}/ping`)
)
