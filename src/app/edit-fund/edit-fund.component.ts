import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { FundService } from '../fund.service';
import { Fund } from '../fund/fund.model';

@Component({
  selector: 'app-edit-fund',
  templateUrl: './edit-fund.component.html',
  styleUrls: ['./edit-fund.component.scss']
})
export class EditFundComponent implements OnInit {
  fund:Fund = {};
  keys:any;
  myId:number = 0;

  constructor(private route:ActivatedRoute, private fundService: FundService, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(params=>{
      this.myId = +params['id'];
      this.fundService.getFund(this.myId).subscribe(payload=> {
        this.fund = payload;
        this.keys = Object.keys(this.fund);
      });
    });
  }

  back() {
    var elements = Array.from(document.getElementsByTagName('input') as HTMLCollectionOf<HTMLElement>);
    elements.forEach(e => e.style.animation = '0.5s fade-out');
    setTimeout(() => this.router.navigateByUrl(this.router.url.slice(0, this.router.url.lastIndexOf('/'))), 500);
  }

  apply() {
    let values = Array.from(document.getElementsByTagName('input')).map(i => i.value);
    let keys = ['name', 'ticker', 'assetClass', 'expenseRatio', 'price', 'priceChange', 'ytd', 'oneyr', 'fiveyr', 'tenyr', 'sinceInception'];
  
    let obj: {[key: string]: any} = {};
    values.forEach((v, i) => obj[keys[i]] = values[i]);
    
    this.fundService.setFund(this.myId, obj).subscribe(d => {
      console.log(d);
      this.back();
    });
  }
}
