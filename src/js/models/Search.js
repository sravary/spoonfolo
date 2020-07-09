import axios from 'axios';

export default class Search {
    constructor(query) {
        this.query = query;
    }
    async getResults(pizza) {
        const proxy = 'https://cors-anywhere.herokuapp.com/';
        const apiKey = '0869b77be6864886ae6ab4752cc12307';
        try {
            const res = await axios(`${proxy}https://api.spoonacular.com/recipes/complexSearch?query=${this.query}&apiKey=${apiKey}`);
            console.log(res);
            this.result = res.data.results;
            // console.log(this.result);
        } catch (error) {
            alert(error);
        }   
    }
}
