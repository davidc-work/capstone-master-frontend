import { Component, OnInit } from '@angular/core';
import { PortfolioService } from '../portfolio.service';
import { ActivatedRoute } from '@angular/router';
import { Transaction } from '../transaction/transaction.model';

@Component({
  selector: 'app-transaction-single',
  templateUrl: './transaction-single.component.html',
  styleUrls: ['./transaction-single.component.scss']
})
export class TransactionSingleComponent implements OnInit {
  transactions:Transaction[] = [];
  fundName:String = "";
  userData:any;
  constructor(private portfolioService: PortfolioService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      console.log(params);
      if(!params["fundId"] || ! params["userId"]){
        return
      } else {
        setTimeout(() => {
          console.log(this.userData, "User data")
          let sessionID = localStorage.getItem("sessionID");
          this.portfolioService.getAllTransactionByFund(+params["fundId"], params["userId"], {username: this.userData.username, sessionID: sessionID}).subscribe((response: any) => {
            console.log(response);
            this.transactions= response;
            this.fundName = response[0].itemDescription;
          })
        }, 1000)
      }
    });
  }

  dateFix(date: string) {
    return new Date(date)
  }
}
