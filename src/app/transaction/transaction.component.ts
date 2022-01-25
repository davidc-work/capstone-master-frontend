import { Component, Input, EventEmitter, OnInit, Output } from '@angular/core';
import { delay } from 'rxjs';
import { FundComponent } from '../fund/fund.component';
import { Fund } from '../fund/fund.model';
import { FundsComponent } from '../funds/funds.component';

@Component({
  providers: [FundsComponent],
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss']
})
export class TransactionComponent implements OnInit {
  @Input() modalOn!: boolean;
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
  @Output() newChange = new EventEmitter<boolean>();

  total:number = 0;
  quantityToBuy:number = 0;
  price:number = 0;
  priceString:string = "";
  constructor(private fundsComponent: FundsComponent) { }

  test:any = this.fundsComponent.fund;
  
  ngOnInit(): void {
    setTimeout(()=>{
      console.log("After")
      console.log(this.fund)
      if(this.fund.price){
        this.price = +this.fund.price.slice(1)
        console.log(this.price)
      }
    },500);

  }
  
  toggleModal(){
    this.modalOn = !this.modalOn;
    this.newChange.emit(this.modalOn);
    console.log(this.modalOn)
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
