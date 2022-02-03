import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { StockService } from '../stock.service';
import { FundService } from '../fund.service';
import { Stock } from '../stocks/stock.model';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.scss']
})

export class StockComponent implements OnInit {
  keys: any;
  id: number = 0;
  stock!: Stock;
  returnTo: string = '/stocks';
  mutualFundIds: any;
  mutualFunds: any;

  formatter = new Intl.NumberFormat('en-us', {
    style: 'currency',
    currency: 'USD'
  });
  
  constructor(private fundService: FundService, private titleService: Title, private route:ActivatedRoute, private stockService: StockService, private router: Router, private appComponent: AppComponent) {
    this.router = router;
    titleService.setTitle('RVProtect');
  }
  
  ngOnInit(): void {
    if (this.appComponent.previousUrl) {
      if (this.appComponent.previousUrl.split('/').includes('edit')) {
        let e = <HTMLElement>document.getElementsByClassName('scroll')[0];
        e.style.animation = 'none';
        e.style.opacity = '1';
      }
    }
    this.route.params.subscribe(params=>{
      this.id = +params['id'];
      this.stockService.getStock(this.id).subscribe(payload=> {
        this.stock = payload;
        console.log(this.stock);
        this.mutualFundIds = this.stock.mutualFundIds?.split(',').map(Number);
        this.titleService.setTitle('RVProtect - ' + this.stock.name);
        this.keys = Object.keys(this.stock);

        this.fundService.getFunds().subscribe(funds => {
          this.mutualFunds = funds.filter((f: any) => this.mutualFundIds.includes(f.id))
            .sort((a: any, b: any) => a.id - b.id);
        });
      });
    });

    this.route.queryParams.subscribe(params => {
      if (params['return']) {
        this.returnTo = '/' + params['return'];
      }
    });
  }

  commas(n: any) {
    return (+n).toLocaleString();
  }

  viewFund(id: number) {
    this.router.navigateByUrl('/funds/' + id + '?return=stocks/' + this.stock.id);
  }

  back() {
    var e: HTMLElement = <HTMLElement>document.getElementsByClassName('stock-main')[0];
    e.className = 'stock-main hide';
    setTimeout(() => this.router.navigateByUrl(this.returnTo), 500);
  }
}
