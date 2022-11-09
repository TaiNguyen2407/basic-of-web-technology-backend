'use strict';
console.log("Hello World");


const figcaptionElem = document.querySelector('figcaption');
const imgElem = document.querySelector('img');
// const h1Elem = document.querySelector('h1');


const getData = async () => {
    const response = await fetch('pics.json');
    console.log(response);
    const data = await response.json();
    console.log(data);
    // h1Elem.innerText = data[0].description;
    imgElem.src = data[0].url;
    imgElem.alt = data[0].description;
    figcaptionElem.innerText = data[0].name;
};

getData();


