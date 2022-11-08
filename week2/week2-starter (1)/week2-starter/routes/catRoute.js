'use strict';
// catRoute
const express = require('express');
const router = express.Router();
const catController = require('../controllers/catController');
const multer = require('multer');
const upload = multer({dest: 'uploads/'});

router
  .route("/")
  .get(catController.getCats)
  .post(upload.single('cat'),catController.createCat)
  .put(catController.modifyCat);
  
router
  .route("/:id")
  .get(catController.getCat)
  .delete(catController.deleteCat);
  

module.exports = router;