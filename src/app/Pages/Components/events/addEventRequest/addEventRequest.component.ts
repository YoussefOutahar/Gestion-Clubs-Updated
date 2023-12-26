import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ClubsService } from '../../../../DataBase/Services/clubs.service';
import { UploadsService } from '../../../../DataBase/Services/uploads.service';
import { Router } from '@angular/router';
import { NotificationsService } from '../../../../DataBase/Services/notifications.service';
import { Notification } from '../../../../DataBase/Models/notification';
import { User } from '@supabase/supabase-js';
import { AuthService } from '../../../../Auth/auth.service';
import { ProfilesService } from '../../../../DataBase/Services/profiles.service';

@Component({
  selector: 'app-addEventRequest',
  templateUrl: './addEventRequest.component.html',
  styleUrls: ['./addEventRequest.component.css'],
})
export class AddEventRequestComponent implements OnInit {
  currentUser: boolean | User | any;
  event: any[] = [];

  firstFormGroup = this._formBuilder.group({
    name: ['', Validators.required],
    location: ['', Validators.required], // Added location control
    date: ['', Validators.required],     // Added date control
  });

  secondFormGroup = this._formBuilder.group({
    description: ['', Validators.required],      // Added description control
    fundingMethods: ['', Validators.required],   // Added funding methods control
    aimedTarget: ['', Validators.required],      // Added aimed target control
  });

  uploadFormGroup = this._formBuilder.group({
    img: [null, Validators.required],
  });


  constructor(
    private _formBuilder: FormBuilder, 
    private clubService: ClubsService, 
    private uploadService: UploadsService, 
    private router: Router,
    private notificationService: NotificationsService,
    private authService: AuthService,
    private profilesService: ProfilesService,
    ) { }

  ngOnInit() { 
    // Get the current user data
    const user = this.authService.currentUser.value;
    this.profilesService.getProfileById(user.id)
      .then((profile) => {
        this.currentUser = profile[0]; // Assuming getProfileById returns an array
        console.log('user : ', this.currentUser);
      })
  }

  // File input change event handler
  onFileChange(event: any) {
    const fileInput = event.target;

    if (fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files[0];
      const fileControl = this.uploadFormGroup.get('img');

      // Update the form control with the selected file
      this.uploadFormGroup.patchValue({
        img: file,
      });

      // Trigger change detection to update the view
      if (fileControl) {
        fileControl.updateValueAndValidity();
      }
    }
  }

  // Submit the form and add the event to the database
  async onSubmit() {
    if (this.firstFormGroup.valid && this.secondFormGroup.valid && this.uploadFormGroup.valid) {
      const imgControl = this.uploadFormGroup.get('img');

      if (imgControl && imgControl.value) {
        const file: File = imgControl.value;
        console.log('File name:', file.name);

        try {
          // Upload the file and get the URL
          await this.uploadService.uploadEventImage(file);

          // Assuming you have a method in clubsService to handle file upload
          const FileUrl =
            'https://vussefkqdtgdosoytjch.supabase.co/storage/v1/object/public/Events_images/' +
            file.name;

          // Update the event with the new values
          const newEvent = {
            name: this.firstFormGroup.value.name!,
            location: this.firstFormGroup.value.location!,
            date: this.firstFormGroup.value.date!,
            description: this.secondFormGroup.value.description!,
            funding_method: this.secondFormGroup.value.fundingMethods!,
            aimed_target: this.secondFormGroup.value.aimedTarget!,
            img: FileUrl,
            state: 'pending',
            id_club: this.currentUser.id_club,
          };

          await this.clubService.addEvent(newEvent);
          const club = await this.clubService.getClubById(this.currentUser.id_club);
          if (club) {
            this.saveNotification(newEvent.name, club[0].name);
          }
          // Update successful, do any additional logic if needed
        } catch (error) {
          console.error('Error updating event:', error);
          // Handle the error as needed
        } finally {
          this.router.navigate(['/dashboard/clubDashboard']);
        }
      } else {
        // Handle the case where no file is selected
        console.error('Please select a file.');
      }
    }
  }

  saveNotification(eventName: string, clubName: string) {
    const notification: Notification = {
      date: new Date().toISOString(),
      title: 'New Event Request',
      body: `A new event "${eventName}" has been requested by ${clubName}. Please review and approve.`,
      icon: 'calendar', // Use the appropriate icon related to events, for example, 'event' or 'calendar'
      to: 'admin',
      id_club: this.currentUser.id_club, 
    };
  
    this.notificationService.addNotification(notification);
  }
  

}
