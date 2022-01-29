import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

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

  constructor(private titleService: Title) {
    titleService.setTitle('RVProtect - Sign Up');
  }

  ngOnInit(): void {
  }

  signup() {

  }

}
