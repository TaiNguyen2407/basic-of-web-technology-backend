'use strict';

// catController
const catModel = require('../models/catModel');
const {validationResult} = require('express-validator');
const makeThumbnail = require('../utils/image');
// const getCoordinates = require('../utils/image');


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
    const errors = validationResult(req);
    if (!req.file) {
        res.status(400).json({message: 'file missing or invalid'});
    } else if (errors.isEmpty()) {
        const cat = req.body;
        console.log('creating a new cat:', cat);
        const catId = await catModel.updateCatById(res,cat,req.params.catId);
        res.status(201).json({message: 'cate edited', catId});
    } else {
        console.log('validation erros:', errors);
        res.status(400).json({message: 'cate edit failed', errors: errors.array() });
    }
};

const createCat = async (req, res) => {
    const errors = validationResult(req);
    // File empty or missing (not passing multer's FileFilter in route)
    if (!req.file) {
        res.status(400).json({message: 'file missing or invalid'});
    } else if (errors.isEmpty()) {
        await makeThumbnail.makeThumbnail(req.file.path, req.file.name);
        //TODO: use image.js/getCoord to extract exif-data/gps coords and add to the cat object as cat.coords property in array format (stringified)
        const cat = req.body;
        cat.coords = JSON.stringify(await makeThumbnail.getCoordinates(req.file.path));
        cat.owner = req.user.user_id;
        console.log('creating a new cat:', cat);
        const catId = await catModel.addCat(res,cat,req.file);
        res.status(201).json({message: 'cate created', catId});
    } else {
        console.log('validation erros:', errors);
        res.status(400).json({message: 'cate creation failed', errors: errors.array() });
    }
};

const deleteCat = async (req, res) => {
    console.log('deleting a cat:', 'cat id: '  + req.params.catId, 'owner: ' +  req.user.user_id);
    const result =  await catModel.deleteCatByAdmin(req.params.catId, req.user.role, res);
    if (result.affectedRows > 0){
        res.json({message: 'cat deleted'});
    } else {
        res.status(401, {message: 'cat deleted failed'});
    }
};

module.exports = {
    getCat,
    getCats,
    modifyCat,
    createCat,
    deleteCat
} 