'use strict';

const pool = require('../database/db');
const promisePool = pool.promise();

const getAllUsers = async (res) => {
  try {
    const [rows] = await promisePool.query("SELECT user_id, name, email, role FROM wop_user");
    return rows;
  } catch(e){
    console.error("error", e.message);
    res.status(500).send(e.message);
  }
};

const getUserbyId = async (res, userId) => {
  try {
    const [rows] = await promisePool.query("SELECT name, email, role FROM wop_user WHERE user_id = ?", [userId]);
    return rows[0];
  } catch(e){
    console.error("error", e.message);
    res.status(500).send(e.message);
  }
}

const getUserLogin = async (user) => {
  try {
    console.log('logging the user params: ', user);
    const [rows] = await promisePool.execute(
        'SELECT * FROM wop_user WHERE email = ?;',
        user);
    return rows;
  } catch (e) {
    console.error("error", e.message);
    res.status(500).send(e.message);
  }
};


const addUser = async (res, data) => {
  const {name,email,passwd} = data;
  try {
    const result = await promisePool.query("INSERT INTO wop_user(name,email,password) VALUES (?, ?, ?)", [name, email, passwd]);
  }catch(e){
    console.error("error", e.message);
    res.status(500).send(e.message);
  }
}

module.exports = {
  getAllUsers,
  getUserbyId,
  addUser, 
  getUserLogin
};
