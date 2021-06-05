import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import {Recipe} from './recipe.model';

@Injectable()
export class RecipeService {
    recipeSelected = new EventEmitter<Recipe>();
    recipesChanged = new Subject<Recipe[]>();

    // private recipes: Recipe[] = [
    //     new Recipe(
    //         'Tasty Schnitzel',
    //         'A super-tasty Schnitzel - just awesome',
    //         'https://joyfoodsunshine.com/wp-content/uploads/2016/09/easy-pizza-casserole-recipe-5.jpg',
    //         [
    //             new Ingredient('meat', 1),
    //             new Ingredient('French Fries', 20)
    //         ]),
    //     new Recipe(
    //         'Big Fat Burger',
    //         'What else you need to say?',
    //         'https://joyfoodsunshine.com/wp-content/uploads/2016/09/easy-pizza-casserole-recipe-5.jpg',
    //         [
    //             new Ingredient('Buns', 2),
    //             new Ingredient('Meat', 1)
    //         ])
    // ];

    private recipes: Recipe[] = [];

    constructor(private shoppingListService: ShoppingListService){}

    setRecipes(recipes: Recipe[]) {
        this.recipes = recipes;
        this.recipesChanged.next(this.recipes.slice());
    }

    getRecipes(): Recipe[] {
        return this.recipes.slice();
    }

    getRecipeById(index: number): Recipe {
        return this.recipes[index];
    }

    addIngredientsToShoppingList(ingredient: Ingredient[]): void {
        this.shoppingListService.addIngredients(ingredient);
    }

    addRecipe(recipe: Recipe): void {
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
    }

    updateRecipe(index: number, newRecipe: Recipe): void {
        this.recipes[index] = newRecipe;
        this.recipesChanged.next(this.recipes.slice());
    }

    deleteRecipe(index: number): void {
        this.recipes.splice(index, 1);
        this.recipesChanged.next(this.recipes.slice());
    }
}
