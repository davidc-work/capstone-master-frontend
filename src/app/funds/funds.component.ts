import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FundService } from '../fund.service';
import { StockService } from '../stock.service';
import { Fund } from '../fund/fund.model';
import { Stock } from '../stocks/stock.model';
import { Router } from '@angular/router';
import { TransactionComponent } from '../transaction/transaction.component';

@Component({
  providers: [TransactionComponent],
  selector: 'app-funds',
  templateUrl: './funds.component.html',
  styleUrls: ['./funds.component.scss']
})

export class FundsComponent implements OnInit {
  fund:Fund = {};
  loaded:boolean = false;
  userData: any;
  notificationComponent: any;

  constructor(private fundService: FundService, private stockService: StockService, private router: Router, titleService: Title) {
    titleService.setTitle('RVProtect - Mutual Funds');
  }

  funds:Fund[] = [];
  stocks:Stock[] = [];

  @ViewChild(TransactionComponent) transactionComponent!: TransactionComponent;

  ngOnInit(): void {
    this.getFunds();
  }

  commas(n: any) {
    return (+n).toLocaleString();
  }

  getFunds() {
    this.fundService.getFunds().subscribe(data => {
      this.funds = data.sort((a: any, b: any) => a.id - b.id).map((f: any) => {
        f.inSearch = true;
        return f;
      });

      this.loaded = true;
    });
  }

  viewFund(n: any) {
    var e: HTMLElement = <HTMLElement>document.getElementsByClassName('scroll')[0];
    e.style.animation = '0.25s out-to-left';
    setTimeout(() => this.router.navigateByUrl(this.router.url + '/' + n), 250);
  }

  interval: any;

  toggleAccordion(n: any) {
    if (this.interval) clearInterval(this.interval);

    const rowElements = document.getElementsByClassName('mutual-funds-row');
    const rowElement = Array.from(rowElements)[n];
    const classes = rowElement.className.split(' ');
    if (classes.includes('active')) {
      rowElement.className = 'mutual-funds-row';
      this.interval = setTimeout(() => (rowElement.children[1] as HTMLElement).style.display = 'none', 500);
    } else {
      (rowElement.children[1] as HTMLElement).style.display = 'block';
      requestAnimationFrame(() => rowElement.className = 'mutual-funds-row active');
    }
  }

  toggleModal(e: any){
    //this.modalOn = !this.modalOn;
    this.transactionComponent.toggleModal(e);
  }

  updateSearch(e: any) {
    requestAnimationFrame(() => { //wait for next frame to get value
      const search = e.target.value.toLowerCase();
      this.funds = this.funds.map((f: any) => {
        f.inSearch = f.name.toLowerCase().includes(search) || f.ticker.toLowerCase().includes(search);
        return f;
      });
    });
  }

  setFund(incoming:Fund){
    this.fund = incoming;
  }

  viewStock(id: number) {
    this.router.navigateByUrl('/stocks/' + id + '?return=funds');
  }
}
