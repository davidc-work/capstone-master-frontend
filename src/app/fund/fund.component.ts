import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FundService } from '../fund.service';
import { Fund } from './fund.model';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { TransactionComponent } from '../transaction/transaction.component';

@Component({
  selector: 'app-fund',
  templateUrl: './fund.component.html',
  styleUrls: ['./fund.component.scss']
})
export class FundComponent implements OnInit {
  modalOn = false;
  fund:Fund = {};
  keys:any;
  id:number = 0;
  @Input() newChange!: boolean;
  
  constructor(private route:ActivatedRoute, private fundService: FundService, private router: Router, private appComponent: AppComponent) {
    this.router = router;
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
        this.keys = Object.keys(this.fund);
      });
    });
  }

  edit() {
    this.router.navigateByUrl(this.router.url + '/edit');
  }

  back() {
    var e: HTMLElement = <HTMLElement>document.getElementsByClassName('scroll')[0];
    e.style.animation = '0.25s out-to-right';
    setTimeout(() => this.router.navigateByUrl('/funds'), 250);
  }

  delete() {
    if (!confirm('Are you sure you want to delete fund ' + this.id + '?')) return ;
    this.fundService.deleteFund(this.id).subscribe(d => {
      this.back();
    });
  }

  viewStocks() {
    this.router.navigateByUrl(this.router.url + '/stocks');
  }
  
  toggleModal(){
    this.modalOn = !this.modalOn;
    console.log(this.modalOn)
  }
  
  resetState(event:any){
    console.log(event);
    this.modalOn = event;
  }
}
