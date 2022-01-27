import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class StockService {

  constructor(private http:HttpClient) { } 

  getStocks(): Observable<any> {
    return this.http.get("http://stocks-microservice.herokuapp.com/stocks");
  }

  getStock(id: number): Observable<any> {
    return this.http.get("http://stocks-microservice.herokuapp.com/stocks/" + id);
  }

  /*setFund(id: number, obj: any): Observable<any> {
    return this.http.put('http://localhost:8082/api/funds/' + id, obj);
  }

  addFund(obj: any): Observable<any> {
    return this.http.post('http://localhost:8082/api/funds/', obj);
  }

  deleteFund(n: any): Observable<any> {
    return this.http.delete('https://immense-brushlands-56087.herokuapp.com/funds/' + n);
  }*/
}
