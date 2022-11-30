'user strict';
const userModel = require('../models/userModel');
const { validationResult } = require('express-validator');

const getUsers =  async (req,res) => {
    const users = await userModel.getAllUsers(res);
    res.json(users);
};

const getUser = async (req, res) => {
    const user = await userModel.getUserbyId(res, req.params.userId);
    if (user){
        res.json(user);
    } else {
        res.sendStatus(404);
    }
}

const createUser = async (req,res) => {
    const newUser = req.body;
    if (!newUser.role){
        //Default user role
        newUser.role = 1;
    }
    const errors = validationResult(req);
    console.log('validation erros:', errors);
    if (errors.isEmpty()) {
        const result = await userModel.addUser(res,newUser);
        res.status(201).json({message: 'user created', userId: result});
    } else {
        res.status(400).json({message: 'user creation failed', errors: errors.array() });
    }
};


const modifyUser = (req, res) => {
    res.json();
};



const deleteUser = (req, res) => {
    console.log(req.body);
    res.json(req.body);
}; 

const checkToken = (req, res) => {
    delete req.user.password;
    res.json({user: req.user});
};

module.exports = {
    getUser,
    getUsers,
    modifyUser,
    createUser,
    deleteUser,
    checkToken
}