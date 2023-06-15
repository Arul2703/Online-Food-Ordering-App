import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SignUpModel } from '../models/signup-model.model';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private baseUrl = 'http://localhost:5045/api/Account';

  constructor(private http: HttpClient) {}

  checkEmailAvailability(email: string): Observable<boolean> {
    const url = `${this.baseUrl}/IsEmailAvailable?email=${email}`;
    return this.http.get<boolean>(url);
  }

  signup(signupData: SignUpModel): Observable<any> {
    const url = `${this.baseUrl}/Signup`;
    return this.http.post(url, signupData);
  }
}
