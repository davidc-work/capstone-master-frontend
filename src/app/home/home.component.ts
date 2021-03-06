import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { tns } from "../../../node_modules/tiny-slider/src/tiny-slider";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private titleService: Title) {
    titleService.setTitle('RVProtect');
  }

  ngOnInit(): void {
    var mainGallery = tns({
      container: '.main-gallery',
      items: 1,
      slideBy: 'page',
      autoplay: true,
      mouseDrag: true,
      controlsContainer: '.controls',
      nav: false,
      speed: 1000,
      autoplayButtonOutput: false
    });
  }

}
