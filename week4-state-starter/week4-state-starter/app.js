'use strict';
const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const app = express();
const port = 3000;


const dummyUser = {
  username : 'foo',
  password : 'bar'
};

let loggedIn = true;

app.set('views', './views');
app.set('view engine', 'pug');
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true})); //Form data
// app.use(session());


app.get('/', (req, res) => {
  res.render('home');
});

app.get('/form', (req, res) => {
  res.render('form');
});

app.get('/secret', (req, res) => {
  if (loggedIn) {
    res.render('secret');
  } else {
    res.redirect('/form');
  }

});

app.post('/login', (req, res) => {
  // check for username and password match
  console.log(req.body);
  if (req.body.username == dummyUser.username && req.body.password == dummyUser.password) {
    loggedIn = true;
    res.redirect('/secret');
  } else {
    res.redirect('/form');
    // res.('Wrong username or password');
  }
  
});

app.get('/getCookie/', (req, res) => {
  console.log(req.cookies);
  res.send('cookie value ' + req.cookies.color);
});


app.get('/deleteCookie/', (req, res) => {
  res.clearCookie('color');
  res.send('cookie value deleted: ' + req.cookies.color);
});

app.get('/setCookie/:color', (req, res) => {
  console.log(req.params.color);
  res.cookie('color', req.params.color);
  res.send('cookies set');
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
