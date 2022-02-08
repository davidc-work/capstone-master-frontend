import { Component, Output, ViewChild, EventEmitter } from '@angular/core';
import { formatDate } from '@angular/common';
import { OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter, pairwise } from 'rxjs/operators';
import { RoutesRecognized } from '@angular/router';
import { FundComponent } from './fund/fund.component';
import { AuthenticationService } from './authentication.service';
import { NotificationComponent } from './notification/notification.component';

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
  @Output() userDataLoaded: EventEmitter<any> = new EventEmitter();

  toolsActive: boolean = false;

  @ViewChild(NotificationComponent) notificationComponent: NotificationComponent;

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

  toggleTools() {
    this.toolsActive = !this.toolsActive;
  }

  onActivate(e: any) {
    e.notificationComponent = this.notificationComponent;

    const publicRoutes = ['/', '/login', '/signup', '/funds', '/stocks'];
    const loggedOutOnlyRoutes = ['/login', '/signup'];
    const username = localStorage.getItem('username');
    const sessionID = localStorage.getItem('sessionID');
    const isPublicRoute = publicRoutes.includes(this.router.url);
    if (!(username && sessionID) && !isPublicRoute) return this.router.navigateByUrl('/login');
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
          if (d0.error) {
            localStorage.setItem('username', '');
            return this.notificationComponent.notify(d0.error, 'error');
          }
          d0.ClientProfile.birthdate = formatDate(d0.ClientProfile.birthdate, 'yyyy-MM-dd', 'en-us');
          this.userData = d0;
          e.userData = d0;
          if (e.hasOwnProperty('userPortfolio')) e.userPortfolio = d0.ClientPortfolios;

          if (e.onUserDataLoaded) e.onUserDataLoaded();
        });
      } else {
        this.userData = undefined;
        if (!isPublicRoute) return this.router.navigateByUrl('/login');
      }

      return ;
    });

    return ;
  }
}
