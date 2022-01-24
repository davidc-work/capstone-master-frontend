import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  transactionUrl = "https://transaction-microservice-v1.herokuapp.com";
  constructor(private httpClient: HttpClient) { }

  //Transaction Service
  //GET
  getTransactionProfile(username: string):Observable<any>{
    return this.httpClient.get(`${this.transactionUrl}/customers/${username}`);
  }

  //POST
  createCustomer(username: string, name: string):Observable<any>{
    return this.httpClient.post(`${this.transactionUrl}/customers/create`, {username: username, name: name})
  }

  createWallet(customerId: number):Observable<any>{
    return this.httpClient.post(`${this.transactionUrl}/wallets/create`, {currencyType: "USD", currencyAmount: 0, CustomerId: customerId})
  }

  createTransaction(request: object):Observable<any>{
    return this.httpClient.post(`${this.transactionUrl}/transactions/create`, request)
  }
}
