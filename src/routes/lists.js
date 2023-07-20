const express = require('express')
const { param, body } = require('express-validator')

const ListControllers = require('../controllers/lists')
const validate = require('../middlewares/validate')
const isAuth = require('../middlewares/isAuth')
const isAdmin = require('../middlewares/isAdmin')

const listValidationSchemaByBody = [
	body('title')
		.notEmpty()
		.withMessage('El título no puede estar vacío')
		.isString()
		.withMessage('Debe proporcionar un título de texto'),
]

const idValidationSchemaByParam = param('id')
	.isMongoId()
	.withMessage('Id invalida')

const router = express.Router()

router.get('/', ListControllers.getAll)

router.get('/:id', idValidationSchemaByParam, validate, ListControllers.getById)

router.post(
	'/',
	isAuth,
	listValidationSchemaByBody,
	validate,
	ListControllers.create
)

router.put(
	'/:id',
	isAuth,
	idValidationSchemaByParam,
	listValidationSchemaByBody,
	validate,
	ListControllers.update
)

router.delete(
	'/:id',
	[isAuth, isAdmin],
	idValidationSchemaByParam,
	validate,
	ListControllers.remove
)

module.exports = router
