const express = require('express')
const { param, body } = require('express-validator')

const UserControllers = require('../controllers/users')
const validate = require('../middlewares/validate')

const userValidationSchemaByBody = [
	body('username')
		.notEmpty()
		.withMessage('El nombre de usuario no puede estar vacío')
		.isString()
		.withMessage('Debe proporcionar un nombre de usuario en texto'),
	body('password')
		.notEmpty()
		.withMessage('La password no puede estar vacía')
		.isString()
		.withMessage('Debe proporcionar un password en texto'),
]

const router = express.Router()

router.post(
	'/signup',
	userValidationSchemaByBody,
	validate,
	UserControllers.register
)
router.post(
	'/signin',
	userValidationSchemaByBody,
	validate,
	UserControllers.login
)

module.exports = router
