import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Transaction } from '../transaction/transaction.model';
import { TransactionService } from '../transaction-service/transaction.service';
import { PortfolioService } from '../portfolio.service';

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
    this.fundKey = this.portfolioSell.fundKey
  }

  readySell() {
    this.amountSell = "$"+this.portfolioSell.fundData.price.substring(1)*this.quantitySell.toFixed(2)
    let request = {
      type: "sell",
      quantity: this.quantitySell,
      CustomerId: this.customer_id,
      id: this.transactionIds,
      fundKey: this.fundKey,
      sessionID: localStorage.getItem("sessionID"),
      username: localStorage.getItem("username"),
      quantityArr: this.quantityArr
    }
    this.transactionService.createSell(request).subscribe((data)=> console.log(data))
    console.log(`Hit sell route with request: `, request)
  }

  getTransactions() {
    let transactions = this.userData.transactions.Transactions.filter((transaction:any) => (transaction.itemDescription === this.portfolioSell.fundData.name) && (transaction.type === "purchase") && (transaction.quantityAvailable > 0));
    console.log(transactions);
    this.transactionIds = transactions.map((transaction: any) => transaction.id)
    console.log(this.transactionIds)
    this.quantityArr = transactions.map((transaction: any) => transaction.quantityAvailable)
  }

  back(data: any) {
    this.cancel.emit(this.portfolioSell)
  }


}
