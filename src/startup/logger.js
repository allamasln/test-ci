const winston = require('winston')
const { combine, colorize, prettyPrint, json, timestamp, printf } =
	winston.format

const config = require('config')
require('winston-mongodb')

const transports = {
	console: new winston.transports.Console({
		level: 'info',
		format: combine(
			colorize(),
			prettyPrint(),
			timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
			printf((info) => `${info.timestamp}-${info.level}: ${info.message}`)
		),
	}),
	combinedFile: new winston.transports.File({
		format: combine(json()),
		filename: 'logs/server.log',
		handleExceptions: true,
		handleRejections: true,
	}),

	errorsFile: new winston.transports.File({
		level: 'error',
		format: combine(json()),
		filename: 'logs/errors.log',
		handleExceptions: true,
		handleRejections: true,
	}),

	db: new winston.transports.MongoDB({
		level: 'error',
		db: config.get('db'),
		options: { useUnifiedTopology: true },
		collection: 'logs',
	}),
}

module.exports = function () {
	winston.add(transports.combinedFile)
	winston.add(transports.errorsFile)
	winston.add(transports.db)

	if (process.env.NODE_ENV !== 'production') winston.add(transports.console)
}
