import axios from 'axios';

export default class Search {
    constructor(query) {
        this.query = query;
    }
    async getResults() {
        const proxy = 'https://cors-anywhere.herokuapp.com/';
        const apiKey = '0869b77be6864886ae6ab4752cc12307';
        const num = 50;
        try {
            const res = await axios(`${proxy}https://api.spoonacular.com/recipes/complexSearch?query=${this.query}&apiKey=${apiKey}&number=${num}`);
            // console.log(res);
            this.result = res.data.results;
            // console.log(this.result);
        } catch (error) {
            alert(error);
        }   
    }
}
