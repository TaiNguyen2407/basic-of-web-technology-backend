'use strict';
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const multer = require('multer');
const upload = multer({dest: 'uploads/'});
const { body } = require('express-validator');


router
    .get('/', userController.getUsers)
    .get('/token', userController.checkToken)
    .get('/:userId', userController.getUser)
    .post('/', 
        body('email').isEmail().normalizeEmail(),
        body('name').isLength({min:3}).trim().escape(),
        body('passwd').isLength({min:8}).trim(),  
        userController.createUser)
    .put('/', (req,res) => {
        res.send('From this endpoint you can edit users.')
    })
    .delete('/', (req,res) => {
        res.send('From this endpoint you can delete users');
    })



module.exports = router;
