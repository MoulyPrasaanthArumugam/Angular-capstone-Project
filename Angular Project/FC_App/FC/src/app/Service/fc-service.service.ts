import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Food } from '../models/food';
import { User } from '../models/user';


@Injectable({
  providedIn: 'root'
})
export class FoodService {

  private apiUrl = 'https://localhost:7133/api/FC/'; // replace with your API endpoint

  constructor(private http: HttpClient) { }

  // get all foods
  getAllFoods(): Observable<Food[]> {
    return this.http.get<Food[]>(this.apiUrl);
  }

  // get foods by category
  getFoodsByCategory(category: string): Observable<Food[]> {
    //return this.http.get<Food[]>(`${this.apiUrl}?category=${category}`);
    return this.http.get<Food[]>(`${this.apiUrl}${category}`);
  }

  addUser(user: User): Observable<any> {
    const userDto = {
      fullName: user.name,
      alias: user.alias,
      email: user.email,
      password: user.password
    };
    return this.http.post<any>(`${this.apiUrl}api/users`, userDto);
    //return this.http.post<any>(`${this.apiUrl + 'users'}${userDto}`);
  }


}
