import { Component } from '@angular/core';
import { formatDate } from '@angular/common';
import { OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter, pairwise } from 'rxjs/operators';
import { RoutesRecognized } from '@angular/router';
import { FundComponent } from './fund/fund.component';
import { AuthenticationService } from './authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'mutual';
  currentUrl: any;
  previousUrl: any;
  keysPressed: string[] = [];
  dropdown: boolean = false;
  userData: any;

  switch() {
    this.dropdown = !this.dropdown
  }

  signout() {
    this.switch();
    localStorage.removeItem('username');
    localStorage.removeItem('sessionID');
    this.router.navigateByUrl('/login');
  }

  constructor(private router: Router, private authenticationService: AuthenticationService) {
    //when route changes
    router.events.subscribe(v => {
      if (!(v instanceof NavigationEnd)) return ;

      window.scrollTo(0, 0);
    });
  }

  ngOnInit() {
    window.scrollTo(0, 0);

    this.router.events.pipe(filter((evt: any) => evt instanceof RoutesRecognized), 
    pairwise()).subscribe((events: RoutesRecognized[]) => {
      this.previousUrl = events[0].urlAfterRedirects;
      this.currentUrl = events[1].urlAfterRedirects;
    });

    document.body.addEventListener('keydown', e => {
      this.keysPressed.push(e.key);
      this.keysPressed = this.keysPressed.slice(-20);
      var lastThree = this.keysPressed.slice(-3).join('');
      if (lastThree == 'lol' && ['add', 'edit'].includes(this.router.url.split('/').slice(-1)[0])) { // lol
        var elements = Array.from(document.getElementsByTagName('input') as HTMLCollectionOf<HTMLInputElement>);
        elements.forEach((e, i) => e.value = 'testing ' + i);
      }
    });

    document.body.addEventListener('mousedown', e => {
      const t = <HTMLElement> e.target;
      const dropdownElement = document.getElementsByClassName('dropdown')[0];
      if (dropdownElement) {
        if (!(dropdownElement.contains(t) || dropdownElement == t)) this.dropdown = false;
      }
    });
  }

  onActivate(e: any) {
    const publicRoutes = ['/', '/login', '/signup', '/funds', '/stocks'];
    const loggedOutOnlyRoutes = ['/login', '/signup'];
    const username = localStorage.getItem('username');
    const sessionID = localStorage.getItem('sessionID');
    if (!(username && sessionID) && !publicRoutes.includes(this.router.url)) return this.router.navigateByUrl('/login');
    this.authenticationService.authenticate({
      username,
      sessionID        
    }).subscribe(d => {
      if (d.customerID) {
        //logged in
        if (loggedOutOnlyRoutes.includes(this.router.url)) {
          this.router.navigateByUrl('/user-profile');
          return ;
        }
        this.authenticationService.getUserData({
          customerID: d.customerID,
          username,
          sessionID
        }).subscribe(d0 => {
          d0.ClientProfile.birthdate = formatDate(d0.ClientProfile.birthdate, 'yyyy-MM-dd', 'en-us');
          this.userData = d0;
          e.userData = d0;
          console.log(this.userData);
        });
      } else this.userData = undefined;
    });

    return ;
  }
}
