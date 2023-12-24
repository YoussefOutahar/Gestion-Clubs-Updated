import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ClubsService } from '../../../../DataBase/Services/clubs.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addMeetingRequest',
  templateUrl: './addMeetingRequest.component.html',
  styleUrls: ['./addMeetingRequest.component.css'],
})
export class AddMeetingRequestComponent implements OnInit {
  meetingForm: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private clubsService: ClubsService,
  ) {
    this.meetingForm = this.fb.group({
      location: [null, Validators.required],
      topic: [null, Validators.required],
      date: [null, Validators.required],
      dateTime: [null, Validators.required],
    });
  }
  ngOnInit() { }

  async onSubmit() {
    if (this.meetingForm.valid) {
      const dateValue = this.meetingForm.value.date;
      const dateTimeValue = this.meetingForm.value.dateTime;

      if (dateValue && dateTimeValue) {
        const timeComponents = dateTimeValue.split(':');
        const combinedDateTime = new Date(dateValue);
        combinedDateTime.setHours(Number(timeComponents[0]));
        combinedDateTime.setMinutes(Number(timeComponents[1]));        const timestamp = combinedDateTime.getTime();
        console.log('combinedDateTime:', combinedDateTime);

        const newMeeting = {
          topic: this.meetingForm.value.topic!,
          location: this.meetingForm.value.location!,
          date: combinedDateTime,
          id_club: 1,
        };


        try {
          // Assuming you have a method in clubsService to handle meeting addition
          await this.clubsService.addMeeting(newMeeting);

          // Meeting added successfully, you can navigate to a different page or perform additional logic
          this.router.navigate(['/dashboard/clubDashboard']);
        } catch (error) {
          console.error('Error adding meeting:', error);
          // Handle the error as needed
        }
      }
    }
  }
}
