"use strict";
const express = require("express");
const router = express.Router();
const {body, sanitizeBody} = require('express-validator');
const { login } = require("../controllers/authController");
const {logout, register} = require("../controllers/authController");

router
.get("/logout", logout)
.post("/login", login)
.post(
    '/register',
    [
      body('name', 'minimum 3 characters').isLength({min: 3}).trim().escape(),
      body('email', 'email is not valid').isEmail().normalizeEmail(),
      body('password', 'at least one upper case letter')
    ],
    register
  );


module.exports = router;