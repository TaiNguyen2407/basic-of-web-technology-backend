'use strict';
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

//To do:
//Get user routes
//Create user controller
//Use data available in userModel

router.get('/', userController.getUsers);

router.get('/:userId', userController.getUser);

router.post('/', userController.createUser);

router.put('/', (req,res) => {
    res.send('From this endpoint you can edit users.');
})


module.exports = router;
