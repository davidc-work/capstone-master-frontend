import { Component, OnInit, Input } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})

export class LoginPageComponent implements OnInit {
  username:string = "";
  password:string = "";
  notificationComponent: any;

  constructor(private router: Router, private authenticationService: AuthenticationService, private titleService: Title) {
    titleService.setTitle('RVProtect - Login');
  }

  ngOnInit(): void {
  }

  login() {
    const u = this.username.slice();
    this.authenticationService.login({
      username: u,
      password: this.password
    }).subscribe(d => {
      if (d.err) return this.notificationComponent.notify(d.err, 'error');
      localStorage.setItem('username', u);
      localStorage.setItem('sessionID', d.sessionID);
      this.router.navigateByUrl('/user-profile');
    });
  }

}
