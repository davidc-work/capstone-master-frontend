import { Component, OnInit,Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-sellingfund',
  templateUrl: './sellingfund.component.html',
  styleUrls: ['./sellingfund.component.scss']
})
export class SellingfundComponent implements OnInit {
  @Output() toSell = new EventEmitter<any>();
  constructor() { }
  @Input() portfolioSell: any;
  @Input() id = '';
  ngOnInit(): void {
    console.log(this.portfolioSell.fundData)

  }



}
