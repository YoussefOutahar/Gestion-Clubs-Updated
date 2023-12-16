// image-slider.component.ts
import { Component, Input, OnInit } from '@angular/core';
import { ClubsService } from '../../../../../DataBase/Services/clubs.service';
@Component({
  selector: 'app-image-slider',
  templateUrl: './image-slider.component.html',
  styleUrls: ['./image-slider.component.css'],
})
export class ImageSliderComponent implements OnInit {
  @Input() interval = 3000; // Time in milliseconds between slides
  images: string[] = []; // Assuming the image paths are strings

  //Just to test and To delete later
  staticImage =
    'https://vussefkqdtgdosoytjch.supabase.co/storage/v1/object/public/Events_images/job%20fair%202.jpg';

  constructor(private clubService: ClubsService) {}

  ngOnInit() {
    this.loadImages();
    setInterval(() => this.nextSlide(), this.interval);
  }

  async loadImages() {
    // Assuming getEvents returns an array of events with an 'img' property
    //const events = await this.clubService.getEvents();
    //this.images = events.map(event => event.img);

    //static image to test
    this.images = [this.staticImage];
  }

  currentIndex = 0;

  nextSlide() {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
  }
}
