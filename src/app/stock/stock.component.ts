import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { StockService } from '../stock.service';
import { Stock } from '../stocks/stock.model';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.scss']
})

export class StockComponent implements OnInit {
  keys:any;
  id:number = 0;
  stock!: Stock;
  
  constructor(private titleService: Title, private route:ActivatedRoute, private stockService: StockService, private router: Router, private appComponent: AppComponent) {
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
        this.titleService.setTitle('RVProtect - ' + this.stock.name);
        this.keys = Object.keys(this.stock);
      });
    });
  }

  back() {
    var e: HTMLElement = <HTMLElement>document.getElementsByClassName('scroll')[0];
    e.style.animation = '0.25s out-to-right';
    setTimeout(() => this.router.navigateByUrl('/stocks'), 250);
  }
}
