import { Component ,OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {FoodService } from '../Service/fc-service.service'
import { Food } from '../models/food';


@Component({
  selector: 'app-food-list',
  templateUrl: './food-list.component.html',
  styleUrls: ['./food-list.component.css']
})
export class FoodListComponent implements OnInit {
  category: string = '';
  type: string[] = [];
  cuisine: string[] = [];
  foods: Food[] = [];

  constructor(private route: ActivatedRoute, private foodService: FoodService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.category = params.get('category') || '';     
      this.getFilteredFoods();
    });
  }
  getFilteredFoods() {
    this.foodService.getFoodsByCategory(this.category).subscribe(data => {
      this.foods = data.filter((food: Food) => {
        return (
          (!this.type.length || (Array.isArray(this.type) && this.type.includes(food.type))) &&
          (!this.cuisine.length || (Array.isArray(this.cuisine) && food.cuisines.split(',').some((cuisine: string) => this.cuisine.includes(cuisine))))
        );
      });

      // Load unique values for type and cuisine from this.foods
      const typeSet = new Set(this.foods.map(food => food.type));
      const cuisineSet = new Set(this.foods.flatMap(food => food.cuisines.split(',')));

      // Convert Set to Array and sort
      this.type = Array.from(typeSet).sort();
      this.cuisine = Array.from(cuisineSet).sort();

    });
  }

  onTypeChange(event: any) {
    if (event.target.value === '') {
      this.type = [];
    } else {
      this.type = [event.target.value];
    }
    this.getFilteredFoods();
  }

  onCuisineChange(event: any) {
    if (event.target.value === '') {
      this.cuisine = [];
    } else {
      this.cuisine = [event.target.value];
    }
    this.getFilteredFoods();
  }

  }
