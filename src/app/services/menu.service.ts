import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FoodItem } from 'src/app/models/food-item';
import { FoodCategory } from '../models/food-category';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private apiUrl = 'https://localhost:7249/api/Menu/Categories';

  constructor(private http: HttpClient) { }

  getAllFoodItems(): Observable<FoodCategory[]> {
    return this.http.get<FoodCategory[]>(`${this.apiUrl}`);
  }
}
