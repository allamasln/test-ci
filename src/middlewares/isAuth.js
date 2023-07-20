const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = function (req, res, next) {
	const authorization = req.headers['authorization']

	const token = authorization && authorization.split(' ')[1]

	// const token = req.headers['x-auth-token']

	if (!token) return res.status(401).send('No hay token')

	try {
		const decoded = jwt.verify(token, config.get('jwtSecret'))
		req.user = decoded

		next()
	} catch (err) {
		return res.status(400).send('Token invalido')
	}
}
