const List = require('../models/list')
const Todo = require('../models/todo')

const create = async (req, res) => {
	const { listId, ...newTodo } = req.body

	const todo = await Todo.create(newTodo)

	await List.findByIdAndUpdate(listId, {
		$push: { todos: todo.id },
	})

	res.json(todo)
}

const update = async (req, res) => {}

const remove = async (req, res) => {}

module.exports = {
	create,
	update,
	remove,
}
