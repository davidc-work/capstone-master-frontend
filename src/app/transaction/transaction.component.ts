import { Component, Input, EventEmitter, OnInit, Output } from '@angular/core';
import { Fund } from '../fund/fund.model';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss']
})
export class TransactionComponent implements OnInit {
  @Input() fund:Fund = {
    name: "",
    ticker: "",
    assetClass: "",
    expenseRatio: "",
    price: "",
    priceChange: "",
    ytd: "",
    oneyr: "",
    fiveyr: "",
    tenyr: "",
    sinceInception: ""
  }
  modalOn: boolean = false;

  total:number = 0;
  quantityToBuy:number = 0;
  price:number = 0;
  priceString:string = "";
  constructor() { }
  
  ngOnInit(): void {
    setTimeout(()=>{
      if(this.fund.price){
        this.price = +this.fund.price.slice(1)
      }
    },500);

  }
  
  toggleModal(e: any){
    this.modalOn = !this.modalOn;
    if (this.modalOn) {
      
    }
  }

  checkInt(){
    if(this.quantityToBuy % 1 !== 0){
      this.quantityToBuy % 1 > 0.5 ? 
        this.quantityToBuy = Math.ceil(this.quantityToBuy) 
        : 
        this.quantityToBuy = Math.floor(this.quantityToBuy)
    }
  }

  addCommas(){
    console.log(this.fund)
    if(this.fund.price){
      this.price = +this.fund.price.slice(1) 
      this.total = +(this.quantityToBuy * this.price).toFixed(2);
    }
    console.log(this.price, this.quantityToBuy)
    this.priceString = this.total.toLocaleString("en-US");
    console.log(this.total, this.priceString);
  }
}
