import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http:HttpClient) { } 

  getProfile(customer_id: number): Observable<any> {
    return this.http.get(`http://user-profile-transaction.herokuapp.com/profile/${customer_id}`);
  }


  addProfile(customer_id: number,obj: any): Observable<any> {
    return this.http.post(`http://user-profile-transaction.herokuapp.com/profile/${customer_id}`,obj);
  }

  editProfile(customer_id: number, obj: any): Observable<any> {
    console.log(customer_id)
    console.log(obj)
    return this.http.put(`http://user-profile-transaction.herokuapp.com/profile/${customer_id}`,obj);
  }
}
