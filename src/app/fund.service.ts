import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FundService {

  constructor(private http:HttpClient) { } 

  getFunds(): Observable<any> {
    return this.http.get("https://protected-dusk-89362.herokuapp.com/mutual-funds");
  }

  getFund(id: number): Observable<any> {
    return this.http.get("https://protected-dusk-89362.herokuapp.com/mutual-funds/" + id);
  }

  setFund(id: number, obj: any): Observable<any> {
    return this.http.put('http://localhost:8082/api/funds/' + id, obj);
  }

  addFund(obj: any): Observable<any> {
    return this.http.post('http://localhost:8082/api/funds/', obj);
  }

  deleteFund(n: any): Observable<any> {
    return this.http.delete('https://immense-brushlands-56087.herokuapp.com/funds/' + n);
  }
}
