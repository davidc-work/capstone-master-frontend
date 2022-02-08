import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { PortfolioService } from '../portfolio.service';

@Component({
  selector: 'app-portfolio-assessment',
  templateUrl: './portfolio-assessment.component.html',
  styleUrls: ['./portfolio-assessment.component.scss']
})
export class PortfolioAssessmentComponent implements OnInit {

  userData: any;
  DOMLoaded: boolean = false;
  loaded: boolean = false;

  totalAssetValue: string = '---';

  constructor(private portfolioService: PortfolioService) {}

  allLoaded() {
    setTimeout(() => this.loaded = true, 1500);

    const funds = this.userData.ClientPortfolios.map((f: any) => f.fundData);
    
    let occurences: any = {};
    funds.forEach((f: any) => {
      occurences[f.assetClass] = (occurences[f.assetClass] || 0) + 1;
    });

    let dataValues = [];
    let labelValues = [];
    let quantities: any = [];
    let dollars: any = [];

    for (var assetClass in occurences) {
      var count = occurences[assetClass];
      dataValues.push(count);
      labelValues.push(assetClass);
      
      let allWithAssetClass = this.userData.ClientPortfolios.filter((p: any) => p.fundData.assetClass == assetClass);
      quantities.push(allWithAssetClass.map((p: any) => p.quantity).reduce((a: any, b: any) => a + b, 0));
      dollars.push(allWithAssetClass.map((p: any) => p.quantity * (+p.fundData.price.slice(1))).reduce((a: any, b: any) => a + b, 0));
    }

    const sum = quantities.reduce((a: any, b: any) => a + b, 0);
    const percents = quantities.map((n: any) => n / sum);

    //const colors = ['red', 'orange', 'yellow', 'cyan', 'blue', 'purple', 'pink', 'lightgreen'];
    const colors = new Array(25).fill(null).map((x, i) => {
      const r = 255;
      const g = (i * 63) % 255;
      const b = 0 + Math.random() * 0;

      return `rgb(${r}, ${g}, ${b})`;
    });

    const sectorsOwnedChartElement: HTMLCanvasElement = <HTMLCanvasElement> document.getElementById('sectors-owned-chart');
    const sectorsOwnedChart = new Chart(sectorsOwnedChartElement, {
      type: 'pie',
      data: {
        labels: labelValues,
        datasets: [
          {
            label: 'Dataset 1',
            data: dataValues,
            backgroundColor: colors,
          }
        ]
      },
      options: {
        responsive: false,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: 'Sectors Owned',
            font: {
              size: 32
            }
          }
        }
      },
    });

    //Sectors Owned - Quantity chart
    const sectorsQuantityChartElement: HTMLCanvasElement = <HTMLCanvasElement> document.getElementById('sectors-quantity-chart');
    const sectorsPercentChart = new Chart(sectorsQuantityChartElement, {
      type: 'pie',
      data: {
        labels: labelValues,
        datasets: [
          {
            label: 'Dataset 1',
            data: quantities,
            backgroundColor: colors,
          }
        ]
      },
      options: {
        responsive: false,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: 'Sectors Owned - Quantity',
            font: {
              size: 32
            }
          }
        }
      },
    });

    //Sectors Owned - Dollars chart
    const sectorsDollarsChartElement: HTMLCanvasElement = <HTMLCanvasElement> document.getElementById('sectors-dollars-chart');
    const sectorsDollarsChart = new Chart(sectorsDollarsChartElement, {
      type: 'pie',
      data: {
        labels: labelValues,
        datasets: [
          {
            label: 'Dataset 1',
            data: dollars,
            backgroundColor: colors,
          }
        ]
      },
      options: {
        responsive: false,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: 'Sectors Owned - Dollars',
            font: {
              size: 32
            }
          }
        }
      },
    });
  }

  onUserDataLoaded() {
    this.totalAssetValue = '$' + this.userData.ClientPortfolios.map((p: any) => 
    p.quantity * (+p.fundData.price.slice(1))).reduce((a: any, b: any) => a + b, 0)
    .toFixed(2);
  }

  ngOnInit(): void {

  }

  ngAfterViewInit() {
    this.DOMLoaded = true;
    // bad practice, but couldn't figure out why it wasn't working
    let interval = setInterval(() => {
      if (document.getElementById('sectors-owned-chart') && this.userData) {
        this.allLoaded();
        clearInterval(interval);
      }
    }, 100);
  }

}
