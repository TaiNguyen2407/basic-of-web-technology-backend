'use strict';

const express = require('express')
const app = express()
const port = 3000
let requestCounter = 0

app.use(express.static('public'));


app.get("/catinfo", (req, res) => {
    const cat = {
      name: "Frank the cat",
      birthdate: "2010-12-25",
      weight: 7,
    };
    res.json(cat);
  });

/*app.get('/', (req, res) => {
    res.send('Hello World!');
});*/

app.get('/test', (request, respond) => {
    console.log('bla bla bla');
    requestCounter++;
    respond.send('<h1>TEST</h1><p>' + requestCounter + '</p>');
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});


