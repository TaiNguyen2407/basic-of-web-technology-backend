// ./models/catModel.js
"use strict";
const pool = require("../database/db");
const promisePool = pool.promise();

const getAllCats = async (res) => {
  try {
    const [rows] = await promisePool.query("SELECT cat_id, wop_cat.name, wop_cat.weight, owner, filename, birthdate, wop_user.name AS ownername FROM wop_cat INNER JOIN wop_user ON wop_cat.owner = wop_user.user_id");
    return rows;
  } catch (e) {
    console.error("error", e.message);
    res.status(500).send(e.message)
  }
};

const getCatById = async (res, catId) => {
  try {
    const [rows] = await promisePool.query("SELECT * FROM wop_cat WHERE cat_id = ?", [catId]);
    return rows[0];
  } catch (e) {
    console.error("error", e.message);
    res.status(500).send(e.message)
  }
};

const addCat = async (res, data, dataImg) => {
  const {name,weight,owner, birthdate} = data;
  const {filename} = dataImg;
  try {
    await promisePool.query("INSERT INTO wop_cat(name, weight, owner,filename, birthdate) VALUES (?, ?, ?, ?, ?)", [name, weight, owner, filename, birthdate]);
  }catch(e){
    console.error("error", e.message);
    res.status(500).send(e.message);
  }
};

const updateCatById = async (req, res) => {
  try {
    const cat = [cat.name, cat.weight, cat.owner, cat.birthdate, catId];
    await promisePool.query("UPDATE wop_cat SET name = ?, weight = ?, owner = ?, birthdate = ? WHERE cat_id = ?", [cat]);
    res.send("Function is working fine");
  }catch(e){
    console.error("error", e.message);
    res.status(500).send(e.message);
  }
};

const deleteCat = async (catId, owner, res) => {
  try {
    const [rows] = await promisePool.query("DELETE FROM wop_cat WHERE cat_id = ? AND owner = ?", [catId, owner]);
    return rows;
  }catch(e){
    console.error("error", e.message);
    res.status(500).send(e.message);
  }
}

// const deleteCatByAdmin = async (catId, user, res) => {
//   if (user.role == 1) {
//       try {
//         const [rows] = await promisePool.query("DELETE FROM wop_cat WHERE cat_id = ? AND owner = ?", [catId, owner]);
//         return rows;
//       }catch(e){
//         console.error("error", e.message);
//         res.status(500).send(e.message);
//       }
//   } else if (user.role == 0){
//     try {
//       const [rows] = await promisePool.query("DELETE FROM wop_cat WHERE catId = ?", [catId]);
//       return rows;
//     }catch(e){
//       console.error("error", e.message);
//       res.status(500).send(e.message);
//     }
//   }
  
// }
module.exports = {
  getAllCats,
  getCatById,
  addCat,
  updateCatById,
  deleteCat
};