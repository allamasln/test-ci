const express = require('express')
const { param, body } = require('express-validator')

const router = express.Router()

const TodoControllers = require('../controllers/todos')
const validate = require('../middlewares/validate')
const isAuth = require('../middlewares/isAuth')
const isAdmin = require('../middlewares/isAdmin')

const todoValidationSchemaByBody = [
	body('title')
		.notEmpty()
		.withMessage('El título no puede estar vacío')
		.isString()
		.withMessage('Debe proporcionar un título de texto'),
	body('listId').isMongoId().withMessage('Id invalida'),
]

const idValidationSchemaByParam = param('id')
	.isMongoId()
	.withMessage('Id invalida')

router.post('/', todoValidationSchemaByBody, validate, TodoControllers.create)

router.put(
	'/:id',
	idValidationSchemaByParam,
	todoValidationSchemaByBody,
	validate,
	TodoControllers.update
)

router.delete(
	'/:id',
	idValidationSchemaByParam,
	validate,
	TodoControllers.remove
)

module.exports = router
