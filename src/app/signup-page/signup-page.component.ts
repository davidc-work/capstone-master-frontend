import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';
import { CookieService } from '../cookie.service';

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

  notificationComponent: any;

  constructor(private cookieService: CookieService, private titleService: Title, private authenticationService: AuthenticationService, private router: Router) {
    titleService.setTitle('RVProtect - Sign Up');
  }

  ngOnInit(): void {
  }

  signup() {
    if (this.password != this.confirmPassword) return this.notificationComponent.notify('Passwords do not match!', 'error');
    if ([this.firstName, this.lastName, this.birthdate, this.email,
      this.username, this.password, this.confirmPassword].includes('')) return this.notificationComponent.notify('Missing fields!', 'error');

    this.authenticationService.signup({
      firstName: this.firstName,
      lastName: this.lastName,
      birthdate: this.birthdate,
      email: this.email,
      username: this.username,
      password: this.password
    }).subscribe(d => {
      console.log(d);
      if (!d.error) {
        //this.cookieService.set('sessionID', d.sessionID, 30);
        //this.cookieService.set('username', d.username, 30);
        localStorage.setItem('sessionID', d.sessionID);
        localStorage.setItem('username', d.username);
        this.router.navigateByUrl('/login');
      }
    });
  }
}
