import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.scss']
})
export class SignupPageComponent implements OnInit {
  firstName:string = "";
  lastName:string = "";
  birthdate:string = "";
  email:string = "";
  username:string = "";
  password:string = "";
  confirmPassword:string = "";

  constructor() { }

  ngOnInit(): void {
  }

  signup() {

  }

}
