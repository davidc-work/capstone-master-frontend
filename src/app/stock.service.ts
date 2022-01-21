import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class StockService {

  constructor(private http:HttpClient) { } 

  getStocks(): Observable<any> {
    return new Observable(subscriber => {
      var data = Array(100).fill(0).map((e, i) => ({
        id: i + 1,
        symbol: 'ABC',
        name: 'teststock' + (i + 1),
        lastSale: '100',
        netChange: '10',
        changePercent: '5%',
        marketCap: ~~(Math.random() * 100000000).toString()
      }));
      subscriber.next(data);
      subscriber.complete();
    });
    //return this.http.get("https://immense-brushlands-56087.herokuapp.com/funds");
  }

  getStock(id: number): Observable<any> {
    return this.http.get("https://immense-brushlands-56087.herokuapp.com/funds/"+id);
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
