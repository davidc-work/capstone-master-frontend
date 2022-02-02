import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  constructor(private http: HttpClient) { }

  signup(data: any): Observable<any> {
    return this.http.post(`https://protected-dusk-89362.herokuapp.com/signup`, data);
  }

  login(data: any): Observable<any> {
    return this.http.post(`https://protected-dusk-89362.herokuapp.com/login`, data);
  }

  authenticate(data: any): Observable<any> {
    return this.http.post(`https://protected-dusk-89362.herokuapp.com/auth`, data);
  }

  getUserData(data: any): Observable<any> {
    return this.http.post(`https://protected-dusk-89362.herokuapp.com/users/${data.customerID}`, data);
  }
}
