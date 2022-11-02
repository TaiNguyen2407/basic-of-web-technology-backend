'user strict';
const userModel = require('../models/userModel');

const getUsers = (req,res) => {
    //Remove password property from user item
    res.json(userModel.users.map(user => {
            delete user.password;
            return user;
        })
    );
};

const getUser = (req, res) => {
    const user = userModel.users.filter(user => {
        return req.params.userId = user.id;
    })[0];

    if (user) {
        delete user.password;
        res.json(user);
    } else{
        res.sendStatus(404);
    }
    
}

const modifyUser = (req, res) => {
    res.json();
};

const createUser = (req,res) => {
    console.log(req.body);
    const userInfo = `username: ${req.body.name}, email: ${req.body.email}`;
    res.send('Adding new user ' + userInfo);
};

const deleteUser = (req, res) => {

}; 

module.exports = {
    getUser,
    getUsers,
    modifyUser,
    createUser,
    deleteUser
}