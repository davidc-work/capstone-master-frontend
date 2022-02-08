import { Component, OnInit } from '@angular/core';
import { PortfolioService } from '../portfolio.service';
import { ActivatedRoute, Router } from '@angular/router';
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
  returnTo:any = "/user-profile";
  load:boolean = false;
  constructor(private portfolioService: PortfolioService, private route: ActivatedRoute, private router: Router) { }

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
            this.fundName = response[0].itemDescription;
            this.transactions = response;
            this.load = true;
          })
        }, 1000)
      }
    });
  }

  dateFix(date: string) {
    return new Date(date)
  }

  back() {
    var e: HTMLElement = <HTMLElement>document.getElementsByClassName('scroll')[0];
    e.className += ' hide';
    setTimeout(() => this.router.navigateByUrl(this.returnTo), 500);
  }
}
