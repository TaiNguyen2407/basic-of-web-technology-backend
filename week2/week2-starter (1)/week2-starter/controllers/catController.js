'use strict';

// catController
const catModel = require('../models/catModel');
const {validationResult} = require('express-validator');


// ./controllers/catController.js
const getCats = async (req, res) => {
  const cats = await catModel.getAllCats(res);
  res.json(cats);
};

const getCat = async (req, res) => {
    //res.send('From this endpoint you can get cat with id' + req.params.catId);
    //Choose only one object with matching id
    const cat = await catModel.getCatById(res, req.params.catId);
    if (cat) {
        res.json(cat); 
    } else {
        res.sendStatus(404);
    }

};

const modifyCat = async (req, res) => {
    const cat = req.body;
    const catId = req.params.catId;
    const result = await catModel.updateCatById(res, cat, catId);
    // if (result.affectedRows > 0){
    //     res.json({message: 'cat edited', catId: catId});
    // } else {
    //     res.status(404).json({message: 'nothing changed'});
    // }
};

const createCat = async (req, res) => {
    const errors = validationResult(req);
    if (!req.file) {
        res.status(400).json({message: 'file missing or invalid'});
    } else if (errors.isEmpty()) {
        const cat = req.body
        console.log('creating a new cat:', cat);
        const catId = await catModel.addCat(res,cat,req.file);
        res.status(201).json({message: 'cate created', catId});
    } else {
        console.log('validation erros:', errors);
        res.status(400).json({message: 'cate creation failed', errors: errors.array() });
    }
};

const deleteCat = async (req, res) => {
    console.log('deleting a cat:', req.params.catId);
    const result =  await catModel.deleteCat(res,req.params.catId);
    // if (result.affectedRows > 0){
    //     res.json({message: 'cat deleted'});
    // } else {
    //     res.status(404).json({message: 'cat was already missing'});
    // }
};

module.exports = {
    getCat,
    getCats,
    modifyCat,
    createCat,
    deleteCat
} 


