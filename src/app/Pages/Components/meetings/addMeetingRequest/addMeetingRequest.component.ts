import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ClubsService } from '../../../../DataBase/Services/clubs.service';
import { Router } from '@angular/router';
import { NotificationsService } from '../../../../DataBase/Services/notifications.service';
import { Notification } from '../../../../DataBase/Models/notification';
import { User } from '@supabase/supabase-js';
import { AuthService } from '../../../../Auth/auth.service';
import { ProfilesService } from '../../../../DataBase/Services/profiles.service';

@Component({
  selector: 'app-addMeetingRequest',
  templateUrl: './addMeetingRequest.component.html',
  styleUrls: ['./addMeetingRequest.component.css'],
})
export class AddMeetingRequestComponent implements OnInit {
  currentUser: boolean | User | any;
  meetingForm: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private clubsService: ClubsService,
    private notificationService: NotificationsService,
    private authService: AuthService,
    private profilesService: ProfilesService,
  ) {
    this.meetingForm = this.fb.group({
      location: [null, Validators.required],
      topic: [null, Validators.required],
      date: [null, Validators.required],
      dateTime: [null, Validators.required],
    });
  }
  ngOnInit() {
    // Get the current user data
    const user = this.authService.currentUser.value;
    this.profilesService.getProfileById(user.id)
      .then((profile) => {
        this.currentUser = profile[0]; // Assuming getProfileById returns an array
        console.log('user : ', this.currentUser);
      })
   }

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
          id_club: this.currentUser.id_club,
        };


        try {
          // Assuming you have a method in clubsService to handle meeting addition
          await this.clubsService.addMeeting(newMeeting);
          const club = await this.clubsService.getClubById(this.currentUser.id_club);
          if (club) {
            this.saveNotification(club[0].name);
          }
          // Meeting added successfully, you can navigate to a different page or perform additional logic
          this.router.navigate(['/dashboard/clubDashboard']);
        } catch (error) {
          console.error('Error adding meeting:', error);
          // Handle the error as needed
        }
      }
    }
  }

  saveNotification(clubName: string) {
    const meetingDate = this.meetingForm.value.date;
    const meetingTime = this.meetingForm.value.dateTime;
    const meetingTopic = this.meetingForm.value.topic;
    const meetingLocation = this.meetingForm.value.location;
  
    const notification: Notification = {
      date: new Date().toISOString(),
      title: 'New Meeting Request',
      body: `A new meeting has been organized by ${clubName}. 
        \nMeeting Details:
        \n- Date: ${meetingDate}
        \n- Time: ${meetingTime}
        \n- Topic: ${meetingTopic}
        \n- Location: ${meetingLocation}`,
      icon: 'calendar', // Use 'event' or 'calendar' for the icon related to meetings/events
      to: 'clubs',
      id_club: this.currentUser.id_club,
    };
  
    this.notificationService.addNotification(notification);
  }
  
}
