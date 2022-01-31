import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http:HttpClient) { } 

  getCustomer(customer_id: number): Observable<any> {
    return this.http.get(`http://user-profile-transaction.herokuapp.com/customer/${customer_id}`);
  }

  getAllCustomer(): Observable<any> {
    return this.http.get(`http://user-profile-transaction.herokuapp.com/customer`);
  }

  addCustomer(obj: any): Observable<any> {
    return this.http.post('http://user-profile-transaction.herokuapp.com/customer',obj);
  }

  removeCustomer(customer_id: number): Observable<any> {
    return this.http.delete(`http://user-profile-transaction.herokuapp.com/customer/${customer_id}`);
  }
}
