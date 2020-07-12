import axios from 'axios';
import { proxy, apiKey, num } from '../config';


export default class Recipe {
    constructor(id) {
        this.id = id;
    }

    async getRecipe() {
        try {
            const res = await axios(`${proxy}https://api.spoonacular.com/recipes/${this.id}/information?apiKey=${apiKey}&includeNutrition=true`);
            this.title = res.data.title;
            this.author = res.data.sourceName;
            this.img = res.data.image;
            this.url = res.data.sourceUrl;
            this.servings = res.data.servings;
            this.ingredients = res.data.nutrition.ingredients;
            this.calories = res.data.nutrition.caloricBreakdown;
            this.instructions = res.data.instructions;
        } catch (error) {
            console.log(error);
            alert('Something went wrong :(');  
        }
    }

    calcTime() {
        // Assuming that we need 15 mins for each 3 ingredients
        const numIng = this.ingredients.length;
        const periods = Math.ceil(numIng / 3);
        this.time = periods * 15;
    }

    calcServings() {
        this.servings = 4;
    }
};