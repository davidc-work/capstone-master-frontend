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
  constructor(private portfolioService: PortfolioService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      console.log(params);
      if(!params["fundId"] || ! params["userId"]){
        return
      } else {
        this.portfolioService.getAllTransactionByFund(+params["fundId"], +params["userId"]).subscribe((response: any) => {
          console.log(response);
          this.transactions= response;
          this.fundName = response[0].itemDescription;
        })
      }
    });
  }

  dateFix(date: string) {
    return new Date(date)
  }
}
