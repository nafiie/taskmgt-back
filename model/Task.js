const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
  title: {type: String, required: true},
  description: {type: String, required: true},
  status: {type: String, required: true},
  due_date: {type: Date},
  createdAt: {type: Date, default: Date.now}
})

module.exports = mongoose.model('task', taskSchema)