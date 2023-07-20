const List = require('../models/list')

const getAll = async (req, res) => {
	const lists = await List.find().populate('todos')

	res.json(lists)
}

const getById = async (req, res) => {
	const list = await List.findById(req.params.id).populate('todos')

	if (!list) return res.status(404).send('La lista no existe')

	res.json(list)
}

const create = async (req, res) => {
	const newList = await List.create(req.body)
	res.json(newList)
}

const update = async (req, res) => {
	const updatedList = await List.findByIdAndUpdate(
		req.params.id,
		{ $set: req.body },
		{ new: true }
	)

	if (!updatedList) return res.status(404).send('La lista no existe')

	res.json(updatedList)
}

const remove = async (req, res) => {
	const deletedList = await List.findByIdAndDelete(req.params.id)

	if (!deletedList) return res.status(404).send('La lista no existe')

	res.json(deletedList)
}

module.exports = {
	getAll,
	getById,
	create,
	update,
	remove,
}
