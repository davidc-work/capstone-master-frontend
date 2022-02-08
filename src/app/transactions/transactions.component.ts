import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Transaction } from '../transaction/transaction.model';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {
  userData:any
  load:boolean = false;
  returnTo:any = "/user-profile";
  paginationArr: any = [];
  currentPage: number = 0;
  constructor(private router: Router) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.load = true;
      console.log(this.userData.transactions.Transactions)
      this.userData.transactions.Transactions.sort( (a:Transaction, b:Transaction) => a.id - b.id);
      let stop = 20;
      let inner = [];
      for(let i = this.userData?.transactions?.Transactions.length - 1; i > 0; i--){
        if(stop === 0){
          stop = 20;
          this.paginationArr.push(inner);
          inner = [];
        }
        inner.push(this.userData.transactions.Transactions[i]);
        stop--;
        if(i === 1){
          this.paginationArr.push(inner);
          inner = [];
        }
      }
      console.log(this.paginationArr, "pagination");
      console.log(this.userData.transactions.Transactions)
    }, 1000)
  }

  selectPage(page:number){
    if(page > this.paginationArr.length - 1){
      return
    }
    this.currentPage = page;
    console.log(this.currentPage)
  }

  addCommas(input: any){
    let output = (+input).toLocaleString("en-US");
    if(output.includes(".")){
      if((output.split(".")[1]).length === 1){
        output += "0";
      }
    } else {
      output += ".00";
    }
    return output
  }

  dateFix(date: string) {
    return new Date(date)
  }

  back() {
    var e: HTMLElement = <HTMLElement>document.getElementsByClassName('transaction-main')[0];
    e.className += ' hide';
    setTimeout(() => this.router.navigateByUrl(this.returnTo), 500);
  }
}
