'user strict';
const userModel = require('../models/userModel');

const getUsers =  async (req,res) => {
    //Remove password property from user item
    const users = await userModel.getAllUsers(res);
    // res.json(userModel.getAllUsers.map(user => {
    //     delete user.password;
    //     return user;
    // }));
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

const modifyUser = (req, res) => {
    res.json();
};

const createUser = async (req,res) => {
    await userModel.addUser(res,req.body);
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