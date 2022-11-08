'user strict';
const userModel = require('../models/userModel');

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
    const result = await userModel.addUser(res,req.body);
    res.status(201).json(result);
};


const modifyUser = (req, res) => {
    res.json();
};



const deleteUser = (req, res) => {
    console.log(req.body);
    res.json(req.body);
}; 

module.exports = {
    getUser,
    getUsers,
    modifyUser,
    createUser,
    deleteUser
}