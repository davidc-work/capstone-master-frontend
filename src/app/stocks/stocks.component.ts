import { Component, OnInit } from '@angular/core';
import { StockService } from '../stock.service';
import { Stock } from './stock.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.scss']
})

export class StocksComponent implements OnInit {

  constructor(private stockService: StockService, private router: Router) { }

  stocks:Stock[] = [];

  ngOnInit(): void {
    this.getStocks();
  }

  getStocks() {
    this.stockService.getStocks().subscribe(payload =>{
      this.stocks = payload.sort((a: any, b: any) => a.id - b.id);
    });
  }

  viewstock(n: any) {
    var e: HTMLElement = <HTMLElement>document.getElementsByClassName('scroll')[0];
    e.style.animation = '0.25s out-to-left';
    setTimeout(() => this.router.navigateByUrl(this.router.url + '/' + n), 250);
  }

  toggleAccordion(n: any) {
    const elements = <HTMLCollection>(document.getElementsByClassName('stocks-row'));
    const rowElement: HTMLElement = <HTMLElement>(Array.from(elements)[n]);
    const detailsElement: HTMLElement = <HTMLElement>Array.from(rowElement.children).slice(-1)[0];
    detailsElement.className = detailsElement.className == 'stocks-details' ? 'stocks-details showing' : 'stocks-details';
  }
}
