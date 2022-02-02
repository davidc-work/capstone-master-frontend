import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  transactionUrl = "https://transaction-microservice-v1.herokuapp.com";
  masterUrl = 'https://protected-dusk-89362.herokuapp.com';
  constructor(private httpClient: HttpClient) { }

  //Transaction Service
  purchaseFund(data: any): Observable<any> {
    return this.httpClient.post(`${this.masterUrl}/purchase-fund`, Object.assign({
      username: localStorage.getItem('username'),
      sessionID: localStorage.getItem('sessionID')
    }, data));
  }

  //GET
  getTransactionProfile(username: string):Observable<any>{
    return this.httpClient.get(`${this.transactionUrl}/customers/${username}`);
  }

  //POST
  createDeposit(request: object):Observable<any> {
    return this.httpClient.post('https://protected-dusk-89362.herokuapp.com/transactions/deposit', request)
  }

  createTransaction(request: object):Observable<any>{
    return this.httpClient.post(`https://protected-dusk-89362.herokuapp.com/transactions/create`, request)
  }

  createSell(request: object):Observable<any> {
    return this.httpClient.post('https://protected-dusk-89362.herokuapp.com/transactions/sell', request)
  }
}
