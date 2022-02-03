import { Component, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})

export class NotificationComponent implements OnInit, AfterViewInit {

  constructor() {}

  mode: string = 'default';
  active: string = '';
  message: string = '';
  fading: string = '';
  element: any;
  interval: any;

  ngOnInit(): void {  
    
  }

  ngAfterViewInit(): void {
    this.element = document.getElementsByClassName('notification-container')[0];
  }

  notify(msg: string, status: string = 'default', time: number = 3000) {
    this.active = '';
    this.message = msg;
    this.mode = status;
    this.fading = '';

    if (this.interval) clearInterval(this.interval);

    requestAnimationFrame(() => {
      this.active = ' active';
      this.interval = setTimeout(() => {
        this.fading = ' fading';
        this.interval = setTimeout(() => this.active = '', 1000);
      }, time);
    });
  }

}
