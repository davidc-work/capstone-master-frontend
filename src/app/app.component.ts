import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { filter, pairwise } from 'rxjs/operators';
import { RoutesRecognized } from '@angular/router';
import { FundComponent } from './fund/fund.component';

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
  dropdown: boolean = false;              //<===== Added variable for dropdown 1/21/2022 Sam

  switch() {                              //<===== Added method for switching 1/21/2022 Sam
    this.dropdown = !this.dropdown
  }

  constructor(private router: Router) {
    router.events.subscribe(v => window.scrollTo(0, 0));
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
  }
}
