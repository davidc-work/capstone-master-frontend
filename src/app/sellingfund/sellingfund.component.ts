import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Transaction } from '../transaction/transaction.model';
import { TransactionService } from '../transaction-service/transaction.service';
import { PortfolioService } from '../portfolio.service';
import { NotificationComponent } from '../notification/notification.component';

@Component({
  selector: 'app-sellingfund',
  templateUrl: './sellingfund.component.html',
  styleUrls: ['./sellingfund.component.scss']
})
  
  
export class SellingfundComponent implements OnInit {
  @Output() cancel = new EventEmitter<any>();
  constructor(private transactionService: TransactionService) { }
  @Input() portfolioSell: any;
  @Input() userData: any;
  @Input() notificationComponent: any;
  @Input() id = '';
  quantityArr: any;
  headers: any = ["Name", "Ticker", "Asset Class", "Expense Ratio", "YTD", "Price Change","Inception", "1yr","5yr","10yr","Price"]
  quantitySell: any = 0;
  amountSell: any = 0;
  transactionIds: number[] = [];
  fundKey: any;
  customer_id: any;
  ngOnInit(): void {
    console.log("Portfolio sell", this.portfolioSell)
    console.log("User data", this.userData)
    this.getTransactions();
    this.customer_id = this.userData.customer_id;
    console.log("Checking customer_id: ",this.customer_id)
    this.fundKey = this.portfolioSell.fundKey
  }

  readySell() {
    if (this.quantitySell > this.portfolioSell.quantity) {
      return this.notificationComponent.notify("You do not have that quantity to sell! Please input the right amount of stocks you want to sell", "error")
    }
    if (this.amountSell == 0 && this.quantitySell == 0) {
      this.notificationComponent.notify('Please input the number of stocks you want to sell', 'error');
    }else{
    this.amountSell = "$"+this.portfolioSell.fundData.price.substring(1)*this.quantitySell.toFixed(2)
    let request = {
      type: "sell",
      quantity: this.quantitySell,
      customer_id: this.customer_id,
      id: this.transactionIds,
      mutualFundId: this.fundKey,
      sessionID: localStorage.getItem("sessionID"),
      username: localStorage.getItem("username"),
      quantityArr: this.quantityArr
    }
    this.transactionService.createSell(request).subscribe((data)=> console.log(data))
    console.log(`Hit sell route with request: `, request)


      this.notificationComponent.notify(`${this.quantitySell} stocks of ${this.portfolioSell.fundData.name} worth ${this.amountSell} is fund successfully sold!`, 'success');

      this.portfolioSell.quantity = this.portfolioSell.quantity - this.quantitySell;

      console.log(this.portfolioSell.quantity)
      console.log(this.portfolioSell)

      if (this.portfolioSell.quantity <= 0) {
        this.portfolioSell = [];
      }

      this.back();
    }
  }

  addComma(x:any) {
    return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
}

  getTransactions() {
    let transactions = this.userData.transactions.Transactions.filter((transaction:any) => (transaction.itemDescription === this.portfolioSell.fundData.name) && (transaction.type === "purchase") && (transaction.quantityAvailable > 0));
    console.log(transactions);
    this.transactionIds = transactions.map((transaction: any) => transaction.id)
    console.log(this.transactionIds)
    this.quantityArr = transactions.map((transaction: any) => transaction.quantityAvailable)
  }

  back(data?: any) {
    this.cancel.emit(this.portfolioSell)
  }


}
