const mongoose = require('mongoose')

const { ObjectId } = mongoose.Schema.Types

const listSchema = new mongoose.Schema({
	title: { type: String, required: true },
	todos: [{ type: ObjectId, ref: 'Todo' }],
})

const List = mongoose.model('List', listSchema)

module.exports = List
