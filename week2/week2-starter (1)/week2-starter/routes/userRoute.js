'use strict';
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const multer = require('multer');
const upload = multer({dest: 'uploads/'});
const { body } = require('express-validator');


router.get('/', userController.getUsers)
    .get('/:userId', userController.getUser)
    .post('/', 
        body('email').isEmail(),
        body('name').isLength( {min:3}),
        body('passwd').isLength({min: 8}),  
        userController.createUser)
    .put('/', (req,res) => {
        res.send('From this endpoint you can edit users.')
    })
    .delete('/', (req,res) => {
        res.send('From this endpoint you can delete users');
    })



module.exports = router;
