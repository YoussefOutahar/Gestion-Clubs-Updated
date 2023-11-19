import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.css'],
})
export class DashboardPageComponent implements OnInit {
  topRowCards = [{ title: 'Card 1' }, { title: 'Card 2' }, { title: 'Card 3' }];

  otherCards = [
    { title: 'Card 4' },
    // Add more cards as needed
  ];

  constructor() {}

  ngOnInit() {}

  // Randomly decide whether to have 1 or 2 cards in subsequent rows
  get randomCols(): string {
    return Math.random() > 0.5 ? '2' : '1';
  }
}
