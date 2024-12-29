const express = require('express')
const router = express.Router()
const {protect} = require('../middleware/authmiddleware')


//methods in our task cotroller
const {createTasks, getAllTasks, getTaskByid, updateTaskByid, deleteTaskByid, } = require('../controllers/taskController');
router.post('', createTasks);
router.get('/', protect,  getAllTasks);
router.get('/:id', protect,  getTaskByid);
router.put('/:id', protect,  updateTaskByid);
router.delete('/:id', protect,  deleteTaskByid);


module.exports = router

