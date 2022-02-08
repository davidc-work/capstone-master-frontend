import { Component, OnInit } from '@angular/core';
import { FundService } from '../fund.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-top-picks',
  templateUrl: './top-picks.component.html',
  styleUrls: ['./top-picks.component.scss']
})

export class TopPicksComponent implements OnInit {

  userData: any;
  topFunds: any;
  chart: any;

  constructor(private fundService: FundService) {

  }

  ngOnInit(): void {
    this.fundService.getFunds().subscribe(funds => {
      this.topFunds = funds.sort((a: any, b: any) => {
        a = +a.sinceInception.slice(0, -1), b = +b.sinceInception.slice(0, -1);
        return b - a;
      }).slice(0, 10);

      const chartElement: HTMLCanvasElement = <HTMLCanvasElement> document.getElementById('performance-chart');
      const ctx = chartElement.getContext('2d');
      this.chart = new Chart(chartElement, {
        type: 'bar',
        data: {
          labels: this.topFunds.map((f: any) => f.ticker),
          datasets: [{
            label: '% change',
            data: this.topFunds.map((f: any) => f.sinceInception.slice(0, -1)),
            backgroundColor: Array(10).fill(0).map((e, i) => {
              return 'rgb(255, ' + (i * 20).toString() + ', 0)'
            })
          }]
        }, options: {
          responsive: false,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true
            },
            x: {
              ticks: {
                font: {
                  size: 16
                }
              }
            }
          }
        }
      });
    });


  }

}
