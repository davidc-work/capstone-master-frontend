import { Component, Input, OnInit } from '@angular/core';
import { TransactionService } from '../transaction-service/transaction.service';

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.scss']
})
export class BillingComponent implements OnInit {
  constructor(private transactionService: TransactionService) { }
  @Input() userData: any = '';
  depositInput: number = 0;
  small:boolean = false;
  info:string = "*Deposit Minimum of $ 10";

  ngOnInit(): void {
    console.log(this.userData)
  }

  addCommas(input: any){
    return input.toLocaleString()
  }

  dateFix(date: string) {
    return new Date(date)
  }

  activateSmall(){
    this.small = true;
  }

  simulateCC(){
    let str = this.userData.customer_id;
    let bank = ["1","2","3","4","5","6","7","8","9","0"];
    str = str.split("").map((char:any) => bank.includes(char) ? char : null).join("");
    console.log(str)
    return str.slice(0,4)
  }

  deposit(){
    console.log({
      "type": "deposit",
      "amount": this.depositInput,
      "CustomerId": this.userData.customer_id
    })
    if(this.depositInput < 10){
      this.info = "Amount less than $10 minimum. Try again.";
      return
    }
    this.transactionService.createDeposit({
      "type": "deposit",
      "amount": this.depositInput,
      "CustomerId": this.userData.customer_id,
      "sessionID": localStorage.getItem("sessionID"),
      "username": localStorage.getItem("username")
    })
      .subscribe(response => {
        console.log(response)
        this.userData.transactions.Wallet.currencyAmount = +response.wallet.newBalance;
        this.userData.transactions.Wallet.updatedAt = new Date();
      })
  }
}
