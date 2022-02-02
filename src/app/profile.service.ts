import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http:HttpClient) { } 

  getProfile(customer_id: string): Observable<any> {
    return this.http.post(`https://protected-dusk-89362.herokuapp.com/user/${customer_id}`, {
      username: localStorage.getItem('username'),
      sessionID: localStorage.getItem('sessionID')
    });
  }

  /*addProfile(customer_id: number,obj: any): Observable<any> {
    return this.http.post(`http://user-profile-transaction.herokuapp.com/profile/${customer_id}`,obj);
  }*/

  editProfile(customer_id: number, obj: any): Observable<any> {
    console.log(customer_id)
    console.log(obj)
    return this.http.put(`https://protected-dusk-89362.herokuapp.com/profile/${customer_id}`, Object.assign({
      username: localStorage.getItem('username'),
      sessionID: localStorage.getItem('sessionID')
    }, obj));
  }
}
