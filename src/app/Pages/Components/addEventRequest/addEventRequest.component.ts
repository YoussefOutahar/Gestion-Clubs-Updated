import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-addEventRequest',
  templateUrl: './addEventRequest.component.html',
  styleUrls: ['./addEventRequest.component.css'],
})
export class AddEventRequestComponent implements OnInit {
  eventFormGroup: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
  });

  constructor() {}

  ngOnInit() {}
}
