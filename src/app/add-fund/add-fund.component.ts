import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { FundService } from '../fund.service';

@Component({
  selector: 'app-add-fund',
  templateUrl: './add-fund.component.html',
  styleUrls: ['./add-fund.component.scss']
})
export class AddFundComponent implements OnInit {
  keys:any;

  constructor(private route:ActivatedRoute, private fundService: FundService, private router: Router) { }


  ngOnInit(): void {
  }

  back() {
    var e: HTMLElement = <HTMLElement>document.getElementsByClassName('scroll')[0];
    e.style.animation = '0.25s out-to-right';
    setTimeout(() => this.router.navigateByUrl('/funds'), 250);
  }

  add() {
    let values = Array.from(document.getElementsByTagName('input')).map(i => i.value);
    let keys = ['name', 'ticker', 'assetClass', 'expenseRatio', 'price', 'priceChange', 'ytd', 'oneyr', 'fiveyr', 'tenyr', 'sinceInception'];
  
    let obj: {[key: string]: any} = {};
    values.forEach((v, i) => obj[keys[i]] = values[i]);
    
    this.fundService.addFund(obj).subscribe(d => {
      console.log(d);
      this.back();
    });
  }

}
