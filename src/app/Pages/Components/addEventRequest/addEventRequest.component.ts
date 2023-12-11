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
    date: new FormControl('', Validators.required),
    cost: new FormControl('', Validators.required),
    img: new FormControl(null, Validators.required),
    url: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    location: new FormControl('', Validators.required),
    aimed_target: new FormControl('', Validators.required),
    time: new FormControl('', Validators.required),
    funding_method: new FormControl('', Validators.required),
  });

  constructor() {}

  ngOnInit() {}
}
