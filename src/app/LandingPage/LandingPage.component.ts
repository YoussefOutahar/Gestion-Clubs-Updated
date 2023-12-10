import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FooterComponent } from './Components/footer/footer.component';
import { NavBarComponent } from './Components/nav-bar/nav-bar.component';
import { GalleryComponent } from './Components/gallery/gallery.component';
import { CarouselClubsComponent } from './Components/carousel-clubs/carousel-clubs.component';
import { CarouselEventsComponent } from './Components/carousel-events/carousel-events.component';
import { BodyComponent } from './Components/body/body.component';

@Component({
  selector: 'app-LandingPage',
  templateUrl: './LandingPage.component.html',
  styleUrls: ['./LandingPage.component.css'],
  standalone: true,
  imports: [
    NavBarComponent,
    BodyComponent,
    GalleryComponent,
    CarouselClubsComponent,
    CarouselEventsComponent,
    FooterComponent,
    CommonModule,
  ],
})
export class LandingPageComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
