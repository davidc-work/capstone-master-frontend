import { Component, Input, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss']
})
export class TransactionComponent implements OnInit {

  constructor() { }
  
  @Input() modalOn!: boolean;
  @Output() newChange = new EventEmitter<boolean>();
  ngOnInit(): void {
  }

  toggleModal(){
    this.modalOn = !this.modalOn;
    this.newChange.emit(this.modalOn);
    console.log(this.modalOn)
  }
}
