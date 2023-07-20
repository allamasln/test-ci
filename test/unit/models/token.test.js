const jwt = require('jsonwebtoken')
const config = require('config')

const User = require('../../../src/models/user')
const mongoose = require('mongoose')

describe('user.generateJWT', () => {
	it('should return a valid JWT', () => {
		const payload = {
			_id: new mongoose.Types.ObjectId().toHexString(),
			username: 'test',
			isAdmin: true,
		}

		const user = new User(payload)
		const token = user.generateJWT()

		const decoded = jwt.verify(token, config.get('jwtSecret'))

		expect(decoded).toMatchObject(payload)
	})
})
