const User = require('../../../src/models/user')
const isAuth = require('../../../src/middlewares/isAuth')
const mongoose = require('mongoose')

describe('isAuth middleware', () => {
	it('should populate req.user with the payload of a valid JWT', () => {
		const user = {
			_id: new mongoose.Types.ObjectId().toHexString(),
			isAdmin: true,
		}
		const token = new User(user).generateJWT()

		const req = {
			headers: {
				authorization: 'Bearer ' + token,
			},
		}

		// console.log(req)
		const res = {}
		const next = jest.fn()

		isAuth(req, res, next)

		expect(req.user).toMatchObject(user)
	})
})
