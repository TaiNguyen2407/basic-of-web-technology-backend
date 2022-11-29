"use strict";
const express = require("express");
const router = express.Router();
const {body, sanitizeBody} = require('express-validator');
// const authController = require('../controllers/authController');
const { login } = require("../controllers/authController");
const {logout, register} = require("../controllers/authController");
router
.get("/logout", logout)
.post("/login", login)
.post(
    '/register',
    [
      body('name', 'minimum 3 characters').isLength({min: 3}),
      body('username', 'email is not valid').isEmail(),
      body('password', 'at least one upper case letter').matches(
        '(?=.*[A-Z]).{8,}'
      ),
      sanitizeBody('name').escape(),
    ],
    register
  );


module.exports = router;