const express = require('express')
const router = express.Router();


//methods in our user cotroller
const {createUsers, loginUser} = require('../controllers/userController');

router.post('', createUsers);
router.post('/login', loginUser)


module.exports = router

