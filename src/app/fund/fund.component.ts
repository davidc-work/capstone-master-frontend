import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { FundService } from '../fund.service';
import { Fund } from './fund.model';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { TransactionComponent } from '../transaction/transaction.component';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

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
  chart: any;
  
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

        this.fund.priceChange = this.fund.priceChange?.replace('$', '');
        
        const priceChange = +this.fund.priceChange!
        const price = +(this.fund.price!).replace('$', '');
        const v = 100 * (priceChange / (price - priceChange));
        this.fund.positiveChange = v > 0;
        this.fund.priceChangePercent = Math.abs(v).toFixed(2) + '%';

        this.titleService.setTitle('RVProtect - ' + this.fund.name);
        this.keys = Object.keys(this.fund);
        
        const chartElement: HTMLCanvasElement = <HTMLCanvasElement> document.getElementById('performance-chart');
        const ctx = chartElement.getContext('2d');
        this.chart = new Chart(chartElement, {
          type: 'bar',
          data: {
            labels: ['One Year', 'Five Year', 'Ten Year', 'Since Inception'],
            datasets: [{
              label: '% change',
              data: [
                this.fund.oneyr?.slice(0, -1),
                this.fund.fiveyr?.slice(0, -1),
                this.fund.tenyr?.slice(0, -1),
                this.fund.sinceInception?.slice(0, -1)
              ],
              backgroundColor: ['#ff0000', '#ff4800', '#ff6f00', '#ffa600']
            }]
          }, options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              y: {
                beginAtZero: true
              },
            }
          }
        });
      });
    });
  }

  commas(n: any) {
    return (+n).toLocaleString();
  }

  viewStock(id: number) {
    this.router.navigateByUrl('/stocks/' + id + '?return=funds/' + this.fund.id);
  }

  back() {
    var e: HTMLElement = <HTMLElement>document.getElementsByClassName('fund-main')[0];
    e.className += ' hide';
    setTimeout(() => this.router.navigateByUrl('/funds'), 500);
  }

  viewStocks() {
    this.router.navigateByUrl(this.router.url + '/stocks');
  }
  
  toggleModal(e: any){
    this.transactionComponent.toggleModal(e);
  }
}
