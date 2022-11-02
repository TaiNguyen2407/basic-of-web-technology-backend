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

const modifyCat = (req, res) => {
    res.json();
};

const createCat = (req, res) => {
    console.log(req.body);
    res.send('adding a cat');
};

const deleteCat = (req, res) => {

};

module.exports = {
    getCat,
    getCats,
    modifyCat,
    createCat,
    deleteCat
}


