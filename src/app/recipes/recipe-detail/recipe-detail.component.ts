import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipeItem!: Recipe;
  id!: number;

  constructor(private recipeService: RecipeService,
              private router: Router,
              private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe(
        (params: Params) => {
          this.id = +params.id;
          this.recipeItem = this.recipeService.getRecipeById(this.id);
        }
      );
  }

  onMenuClick(): void {
    this.recipeService.addIngredientsToShoppingList(this.recipeItem.ingredients);
  }

  onEditRecipe(): void {
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

  onDeleteRecipe(): void {
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['/recipes'], {relativeTo: this.route});
  }

}
