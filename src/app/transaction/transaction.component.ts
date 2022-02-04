import { Component, Input, EventEmitter, OnInit, Output } from '@angular/core';
import { Fund } from '../fund/fund.model';
import { TransactionService } from '../transaction-service/transaction.service';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss']
})
export class TransactionComponent implements OnInit {
  @Input() userData: any;
  @Input() fund:Fund = {
    id: undefined,
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
  
  @Input() notificationComponent: any;

  constructor(private transactionService: TransactionService) { }
  
  ngOnInit(): void {
    setTimeout(()=>{
      if(this.fund.price){
        this.price = +this.fund.price.slice(1)
      }
    },500);
  }

  purchase() {
    if (this.quantityToBuy < 1) return this.notificationComponent.notify('Invalid quantity!', 'error');
    this.transactionService.purchaseFund({
      fund_id: this.fund.id,
      quantity: this.quantityToBuy,
      customerId: this.userData.customer_id
    }).subscribe(d => {
      console.log(d);
      if (d.error) return this.notificationComponent.notify(d.error, 'error');
      this.notificationComponent.notify(this.quantityToBuy + ' shares of ' + this.fund.name + ' purchased!', 'success');
      this.toggleModal();
    })
  }
  
  toggleModal(e: any = undefined){
    this.modalOn = !this.modalOn;
    this.quantityToBuy = 0;
    this.total = 0;
  }

  checkInt(){
    this.quantityToBuy = Math.max(Math.min(Math.round(this.quantityToBuy), 9999), 0);
    /*if(this.quantityToBuy % 1 !== 0){
      this.quantityToBuy % 1 > 0.5 ? 
        this.quantityToBuy = Math.ceil(this.quantityToBuy) 
        : 
        this.quantityToBuy = Math.floor(this.quantityToBuy)
    }*/
  }

  addCommas(){
    if(this.fund.price){
      this.price = +this.fund.price.slice(1) 
      this.total = +(this.quantityToBuy * this.price).toFixed(2);
    }
    this.priceString = this.total.toLocaleString("en-US");
  }

  checkInput() {
    requestAnimationFrame(() => {
      this.checkInt();
      this.addCommas();
    });
  }
}
