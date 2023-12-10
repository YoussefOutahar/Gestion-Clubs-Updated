import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-addMeetingRequest',
  templateUrl: './addMeetingRequest.component.html',
  styleUrls: ['./addMeetingRequest.component.css'],
})
export class AddMeetingRequestComponent implements OnInit {
  meetingFormGroup = new FormGroup({
    location: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    date: new FormControl('', [Validators.required]),
  });

  constructor() {}

  ngOnInit() {}
}
