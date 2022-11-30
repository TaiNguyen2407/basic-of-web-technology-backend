"use strict";
const jwt = require("jsonwebtoken");
const passport = require("passport");
require("dotenv").config();
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const userModel = require('../models/userModel');

const login = (req, res) => {
    passport.authenticate('local', {session: false}, (err, user, info) => {
        if (err || !user) {
            return res.status(400).json({
                message: 'Something is not right',
                user: user
            });
        }
    req.login(user, {session: false}, (err) => {
        if (err) {
            res.send(err);
        }
        // generate a signed son web token with the contents of user object and return it in the response
        delete user.password;
        const token = jwt.sign(user, process.env.JWT_SECRET);
        return res.json({user, token});
        });
    })(req, res);
};

const logout = (req, res) => {
    res.logout();
    res.json({message: 'logout'});
}

const register = async (req, res) => {
    const newUser = req.body;
    if (!newUser.role){
        //Default user role
        newUser.role = 1;
    }
    const errors = validationResult(req);
    console.log('validation erros:', errors);
    if (errors.isEmpty()) {
        //Hash the input password and replace the clear text password with the hashed one before adding to the db
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(newUser.passwd, salt);
        newUser.passwd = passwordHash;
        const result = await userModel.addUser(res, newUser);
        res.status(201).json({message: 'user created', userId: result});
        console.log(passwordHash);
    } else {
        res.status(400).json({message: 'user creation failed', errors: errors.array() });
    }
}

module.exports = {
  login,
  logout,
  register
};