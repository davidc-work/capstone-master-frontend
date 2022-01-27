import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {

  constructor(private http:HttpClient) { } 

  getUserPortfolio(customer_id: number, fundkey_id: number): Observable<any> {
    return this.http.get(`http://user-profile-transaction.herokuapp.com/portfolio/${customer_id}/fundkey/${fundkey_id}`);
  }

  getAllUserPortfolio(customer_id: number): Observable<any> {
    return this.http.get(`http://user-profile-transaction.herokuapp.com/portfolio/${customer_id}`);
  }

  addUserPortfolio(obj: any): Observable<any> {
    return this.http.post('http://user-profile-transaction.herokuapp.com/portfolio/',obj);
  }

  removeUserPortfolio(customer_id: number, fundkey_id: any): Observable<any> {
    return this.http.delete(`http://user-profile-transaction.herokuapp.com/portfolio/${customer_id}/${fundkey_id}`);
  }
}
