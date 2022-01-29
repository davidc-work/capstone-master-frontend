import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { StockService } from '../stock.service';
import { Stock } from './stock.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.scss']
})

export class StocksComponent implements OnInit {

  constructor(private titleService: Title, private stockService: StockService, private router: Router) {
    titleService.setTitle('RVProtect - Stocks');
  }

  objectKeys = Object.keys;

  stocks:Stock[] = [];
  loaded:boolean = false;

  ngOnInit(): void {
    this.getStocks();
  }

  getStocks() {
    var formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    });

    this.stockService.getStocks().subscribe(payload =>{
      this.stocks = payload.sort((a: any, b: any) => a.id - b.id);
      this.stocks.forEach(s => {        
        s.marketCap = formatter.format(+s.marketCap!).slice(0, -3);
      });
      this.loaded = true;
    });
  }

  viewstock(n: any) {
    var e: HTMLElement = <HTMLElement>document.getElementsByClassName('scroll')[0];
    e.style.animation = '0.25s out-to-left';
    setTimeout(() => this.router.navigateByUrl(this.router.url + '/' + n), 250);
  }

  interval:any;

  toggleAccordion(n: any) {
    if (this.interval) clearInterval(this.interval);

    const rowElements = document.getElementsByClassName('stocks-row');
    const rowElement = Array.from(rowElements)[n];
    const classes = rowElement.className.split(' ');
    if (classes.includes('active')) {
      rowElement.className = 'stocks-row';
      this.interval = setTimeout(() => (rowElement.children[1] as HTMLElement).style.display = 'none', 500);
    } else {
      (rowElement.children[1] as HTMLElement).style.display = 'block';
      requestAnimationFrame(() => rowElement.className = 'stocks-row active');
    }
  }
}
