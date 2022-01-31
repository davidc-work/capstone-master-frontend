import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  username:string = "";
  password:string = "";
  constructor(private titleService: Title) {
    titleService.setTitle('RVProtect - Login');
  }

  ngOnInit(): void {
  }

  login() {
    console.log(this.username, this.password)
  }

}
