// Put code of task B here

//Initializing elements
const main = document.querySelector('main');
const article = document.createElement('article');

const header = document.createElement('header');

const h2 = document.createElement('h2');

const figure = document.createElement('figure');

const img = document.createElement('img');

const figCaption = document.createElement('figcaption');

const p = document.createElement('p');


//Setting content
h2.innerHTML = "Task B article header";
img.src = "http://placekitten.com/320/160";
img.alt = "title";
figCaption.innerHTML = "Task B caption";
p.innerHTML = "Task B.";


//Adding elements
main.append(article);
article.append(header, figure, p);
header.append(h2);
figure.append(img, figCaption);

console.log(main);