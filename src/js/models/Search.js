export default class Search {
    constructor(query) {
        this.query = query;
    }
}

import axios from 'axios';

async function getResults(query) {
    const proxy = 'https://cors-anywhere.herokuapp.com/';
    const apiKey = '0869b77be6864886ae6ab4752cc12307';
    try {
        const res = await axios(`${proxy}https://api.spoonacular.com/food/products/search?query=${query}&apiKey=${apiKey}`);
        const recipes = res.data.products;
        console.log(recipes);
    } catch (error) {
        alert(error);
    }   
}
getResults('pad thai');