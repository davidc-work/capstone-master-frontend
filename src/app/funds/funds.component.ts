import { Component, Input, OnInit, ViewChild } from '@angular/core';
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

  constructor(private fundService: FundService, private stockService: StockService, private router: Router) { }

  funds:Fund[] = [];
  stocks:Stock[] = [];

  @ViewChild(TransactionComponent) transactionComponent!: TransactionComponent;

  ngOnInit(): void {
    this.getFunds();
  }

  getFunds() {
    this.fundService.getFunds().subscribe(data => {
      this.funds = data.sort((a: any, b: any) => a.id - b.id);
      this.loaded = true;
    });
  }

  viewFund(n: any) {
    var e: HTMLElement = <HTMLElement>document.getElementsByClassName('scroll')[0];
    e.style.animation = '0.25s out-to-left';
    setTimeout(() => this.router.navigateByUrl(this.router.url + '/' + n), 250);
  }

  addFund() {
    var e: HTMLElement = <HTMLElement>document.getElementsByClassName('scroll')[0];
    e.style.animation = '0.25s out-to-left';
    setTimeout(() => this.router.navigateByUrl(this.router.url + '/add'), 250);
  }

  deleteFund(n: any) {
    if (!confirm('Are you sure you want to delete fund ' + n + '?')) return ;
    this.fundService.deleteFund(n).subscribe(d => {
      var elements = <HTMLCollection>(document.getElementsByTagName('tr'));
      var e: HTMLElement = <HTMLElement>(Array.from(elements).find(e => {
        return e.children[0].innerHTML == n.toString();
      }));
      e.style.animation = '0.4s out-to-left';
      e.style.animationFillMode = 'forwards';
      setTimeout(() => this.getFunds(), 400);
    });
  }

  toggleAccordion(n: any) {
    const rowElements = document.getElementsByClassName('mutual-funds-row');
    const rowElement = Array.from(rowElements)[n];
    rowElement.className = rowElement.className == 'mutual-funds-row' ? 'mutual-funds-row active' : 'mutual-funds-row';
  }

  toggleModal(e: any){
    //this.modalOn = !this.modalOn;
    this.transactionComponent.toggleModal(e);
  }

  setFund(incoming:Fund){
    this.fund = incoming;
    console.log(this.fund);
  }
}
