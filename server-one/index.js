'use strict';

const express = require('express')
const app = express()
const port = 3000
let requestCounter = 0

app.use(express.static('public'));
app.set('view engine', 'pug');

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
    // Example of using pug
    respond.render('test', {
        title: "Pug Test Page",
        header1: "Pug Test Page",
        header2: "Counter",
        exampleText: "Page requested " + requestCounter + " times",
    });
    // basic html as string
    //respond.send('<h1>TEST</h1><p>' + requestCounter + '</p>');
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});


