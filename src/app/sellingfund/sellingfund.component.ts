import { Component, OnInit,Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-sellingfund',
  templateUrl: './sellingfund.component.html',
  styleUrls: ['./sellingfund.component.scss']
})
export class SellingfundComponent implements OnInit {
  @Output() cancel = new EventEmitter<any>();
  constructor() { }
  @Input() portfolioSell: any;
  @Input() id = '';
  headers: any = ["Name", "Ticker", "Asset Class", "Expense Ratio", "YTD", "Price Change","Inception", "1yr","5yr","10yr","Price"]
  quantitySell: any = 0;
  amountSell: any = 0;
  ngOnInit(): void {
  }

  readySell() {
    this.amountSell = "$"+this.portfolioSell.fundData.price.substring(1)*this.quantitySell.toFixed(2)
  }

  back(data: any) {
    this.cancel.emit(this.portfolioSell)
  }


}
