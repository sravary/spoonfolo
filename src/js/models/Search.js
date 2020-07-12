import axios from 'axios';
import { proxy, apiKey, num } from '../config';

export default class Search {
    constructor(query) {
        this.query = query;
    }
    async getResults() {
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
