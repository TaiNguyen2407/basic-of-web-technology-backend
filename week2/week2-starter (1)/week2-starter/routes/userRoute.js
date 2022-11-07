'use strict';
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const multer = require('multer');
const upload = multer({dest: 'uploads/'});

//To do:
//Get user routes
//Create user controller
//Use data available in userModel

router.get('/', userController.getUsers);

router.get('/:userId', userController.getUser);

router.post('/', upload.single('user'),userController.createUser);

router.put('/', (req,res) => {
    res.send('From this endpoint you can edit users.');
})

router.delete('/', (req,res) => {
    res.send('From this endpoint you can delete users');
})


module.exports = router;
