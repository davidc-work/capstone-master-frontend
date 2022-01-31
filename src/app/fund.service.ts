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
}
