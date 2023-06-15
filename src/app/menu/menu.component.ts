import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MenuService } from '../services/menu.service';
import { FoodCategory } from '../models/food-category';
import { FoodItem } from '../models/food-item';
import { CategoryFilterPipe } from '../category-filter.pipe';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  providers: [CategoryFilterPipe] // Add the custom pipe as a provider
})
export class MenuComponent implements OnInit {
  foodCategories: FoodCategory[] = [];
  addToCartForm: FormGroup;
  selectedCategory: string = 'All'; // Property to store the selected category

  constructor(
    private menuService: MenuService,
    private formBuilder: FormBuilder,
    private categoryFilterPipe: CategoryFilterPipe // Inject the custom pipe
  ) {
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

  filterItems(category: string) {
    this.selectedCategory = category;
  }
}
