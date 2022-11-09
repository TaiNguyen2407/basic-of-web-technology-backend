'use strict';

const apiUrl = 'https://api.tvmaze.com/search/shows?q=';

//get references to DOM elements
const form = document.querySelector('#search-form');
const button = form.querySelector('button');
const input = form.querySelector('input');
const results = document.querySelector('#results');

button.addEventListener('click', (event) => {
    //do not submit form to anywhere, prevents the form from submitting to another screen
    event.preventDefault();
    //prevent generic event listener at the bottom of the script
    event.stopPropagation();
    if (input.value){
        getTVSeriesData(input.value);
    }
});

const renderResults = (data) => {
    //Clear existing results before appending new ones
    results.innerHTML = '';
    //loop through all search results
    for (let i = 0; i < data.length; i++) {
        const h3 = document.createElement('h3');
        h3.innerText = data[i].show.name;
        const img = document.createElement('img');
        img.src = data[i].show.image.medium ? data[i].show.image.medium :'http://placekitten.com/200/300';
        const officialSite = document.createElement('a');
        officialSite.href = data[i].show.officialSite;
        officialSite.innerText = "Official Website";
        officialSite.style.display = 'block';
        const summary = document.createElement('p');
        summary.innerHTML = data[i].show.summary;

        const genreList = data[i].show.genres;
        const genres = document.createElement('div');
        for (let j = 0; j < genreList.length; j++) {
            const genre = document.createElement('span');
            genre.innerText = genreList[j];
            if (j !== (genres.length - 1)){
                genre.innerText+=" | "
            }
            genres.append(genre);
        }
        results.append(h3); 
        results.append(img);
        results.append(officialSite);
        results.append(summary);
        results.append(genres)
    }
};

const getTVSeriesData = async (name) => {
    try {
        const response = await fetch(apiUrl + name);
        const data = await response.json();
        renderResults(data);
    } catch(error){
        console.log('Network failure: ', error);
    }
};


//generic event hanlding example
document.addEventListener('click', () => {
    console.log('clicked');
});
