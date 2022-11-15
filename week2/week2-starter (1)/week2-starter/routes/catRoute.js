'use strict';
// catRoute
const express = require('express');
const router = express.Router();
const catController = require('../controllers/catController');
const multer = require('multer');
const { body } = require('express-validator');
const upload = multer({dest: 'uploads/'});

router
  .route("/")
  .get(catController.getCats)
  .post(
    upload.single('cat'),
    body('name').isAlphanumeric(),
    body('birthdate').isDate(),
    body('weight').isFloat({min: 0.1, max: 30}),
    body('owner').isInt({min:1}),
    catController.createCat)
  .put(catController.modifyCat);
  
  
router
  .route("/:id")
  .get(catController.getCat)
  .delete(catController.deleteCat)
  .put(catController.modifyCat);
  

module.exports = router;