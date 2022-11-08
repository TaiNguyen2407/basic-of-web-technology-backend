'use strict';

// catController
const catModel = require('../models/catModel');


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
    await catModel.updateCat(res,req.body);
};

const createCat = async (req, res) => {
    await catModel.addCat(res,req.body,req.file);
};

const deleteCat = async (req, res) => {
    await catModel.deleteCat(res,req.params.catId);
};

module.exports = {
    getCat,
    getCats,
    modifyCat,
    createCat,
    deleteCat
}


