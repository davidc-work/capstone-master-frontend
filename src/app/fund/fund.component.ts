import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { FundService } from '../fund.service';
import { Fund } from './fund.model';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { TransactionComponent } from '../transaction/transaction.component';

@Component({
  providers: [TransactionComponent],
  selector: 'app-fund',
  templateUrl: './fund.component.html',
  styleUrls: ['./fund.component.scss']
})
export class FundComponent implements OnInit {
  fund:Fund = {};
  keys:any;
  id:number = 0;
  
  @ViewChild(TransactionComponent) transactionComponent!: TransactionComponent;
  
  constructor(private titleService: Title, private route:ActivatedRoute, private fundService: FundService, private router: Router, private appComponent: AppComponent) {
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
      this.fundService.getFund(this.id).subscribe(payload=> {
        this.fund = payload;
        this.titleService.setTitle('RVProtect - ' + this.fund.name);
        this.keys = Object.keys(this.fund);
      });
    });
  }

  back() {
    var e: HTMLElement = <HTMLElement>document.getElementsByClassName('scroll')[0];
    e.style.animation = '0.25s out-to-right';
    setTimeout(() => this.router.navigateByUrl('/funds'), 250);
  }

  viewStocks() {
    this.router.navigateByUrl(this.router.url + '/stocks');
  }
  
  toggleModal(e: any){
    this.transactionComponent.toggleModal(e);
  }
}
