import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css'],
  standalone: true,
  imports: [CommonModule],
})
export class BodyComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
