const config = require('config')
const winston = require('winston')

module.exports = function () {
	if (!config.has('jwtSecret')) {
		const msg = 'Se necesita clave privada para jwt'

		winston.error(msg)
		throw new Error(msg)
	}
}
