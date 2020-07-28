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

    parseIngredients() {
        const unitsLong = [
            'tablespoons', 'tablespoon', 'ounces', 'ounce', 'teaspoons', 'teaspoon', 'cups', 'pounds'
        ];
        const unitsShort = [
            'tbsp', 'tbsp', 'oz', 'oz', 'tsp', 'tsp', 'cup', 'lb'
        ];

        const newIngredients = Object.keys(this.ingredients).map(el => {
            console.log(typeof el);
            // 1. Uniform units
            let ingredient = el.toLowerCase();
            unitsLong.forEach((unit, i) => {
                ingredient = ingredient.replace(unit, unitsShort[i]);
            });

            // 2. Remove parentheses
            ingredient = ingredient.replace(/ *\([^)]*\) */g, ' ');

            // 3. Parse ingredients into count, unit and ingredient
            const arrIng = ingredient.split(' ');
            const unitIndex = arrIng.findIndex(el2 => unitsShort.includes(el2));

            let objIng;
            if (unitIndex > -1) {
                // There is a unit
                // Ex. 4 1/2 cups, arrCount is [4, 1/2] --> eval('4+1/2') --> 4.5
                // Ex. 4 cups, arrCount is [4]
                const arrCount = arrIng.slice(0, unitIndex);
                let count;
                if (arrCount.length === 1) {
                    count = eval(arrIng[0].replace('-', '+'));
                } else {
                    count = eval(arrIng.slice(0, unitIndex).join('+'));
                }

                objIng = {
                    count,
                    unit: arrIng[unitIndex],
                    ingredient: arrIng.slice(unitIndex + 1).join(' ')
                };

            } else if (parseInt(arrIng[0], 10)) {
                // There is NO unit, but 1st element is a number
                objIng = {
                    count: parseInt(arrIng[0], 10),
                    unit: '',
                    ingredient: arrIng.slice(1).join(' ')
                }
            } else if (unitIndex === -1) {
                // There is NO unit and NO number in 1st position
                objIng = {
                    count: 1,
                    unit: '',
                    // ingredient: ingredient can also be written like so
                    ingredient
                }
            }

            return objIng;
        });
        this.ingredients = newIngredients;
    }
};