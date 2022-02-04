import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {
  userData:any
  load:boolean = false;
  returnTo:any = "/user-profile";
  constructor(private router: Router) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.load = true;
      console.log(this.userData)
    }, 500)
  }

  addCommas(input: any){
    let output = (+input).toLocaleString("en-US");
    console.log(output)
    if(output.includes(".")){
      if((output.split(".")[1]).length === 1){
        console.log(output.split(".")[1])
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
