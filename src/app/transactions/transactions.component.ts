import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {
  userData:any
  load:boolean = true;
  constructor() { }

  ngOnInit(): void {
    setTimeout(() => {
      this.load = false;
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
}
