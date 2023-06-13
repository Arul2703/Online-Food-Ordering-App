import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MenuService } from '../menu.service';
import { FoodCategory } from '../models/food-category';
import { FoodItem } from '../models/food-item';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  foodCategories: FoodCategory[] = [];
  addToCartForm: FormGroup;

  constructor(private menuService: MenuService, private formBuilder: FormBuilder) {
    this.addToCartForm = this.formBuilder.group({
      itemId: ['']
    });
  }

  ngOnInit(): void {
    this.menuService.getAllFoodItems().subscribe(
      (data: FoodCategory[]) => {
        console.log('API Response:', data); // Log the API response data
        this.foodCategories = data;
        console.log('foodCategories:', this.foodCategories); // Log the assigned data
      },
      (error) => {
        console.log('Error occurred while retrieving food items:', error);
      }
    );
  }
  

  addToCart(itemId: number): void {
    // Here, you can perform the logic to add the item to the cart
    console.log('Adding item to cart:', itemId);
  }
}
