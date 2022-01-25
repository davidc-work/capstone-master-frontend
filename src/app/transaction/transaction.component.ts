import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss']
})
export class TransactionComponent implements OnInit {
  modalOn: boolean = false;

  constructor() {

  }
  
  ngOnInit(): void {
  }

  toggleModal(e: any){
    this.modalOn = !this.modalOn;
    if (this.modalOn) {
      
    }
  }
}
