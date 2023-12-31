// suppBudget.component.ts

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NewDocument } from '../../../../DataBase/Models/club';
import { ClubsService } from '../../../../DataBase/Services/clubs.service';
import { NotificationsService } from '../../../../DataBase/Services/notifications.service';
import { UploadsService } from '../../../../DataBase/Services/uploads.service';
import { User } from '@supabase/supabase-js';
import { AuthService } from '../../../../Auth/auth.service';
import { ProfilesService } from '../../../../DataBase/Services/profiles.service';
import { Notification } from '../../../../DataBase/Models/notification';

@Component({
  selector: 'app-suppBudget',
  templateUrl: './suppBudget.component.html',
  styleUrls: ['./suppBudget.component.css'],
})
export class SuppBudgetComponent implements OnInit {
  currentUser: boolean | User | any;
  suppBudgetForm!: FormGroup;
  events: any[] = [];
  successMessage: string | null = null;

  constructor(
    private router: Router,
    private clubsService: ClubsService,
    private fb: FormBuilder,
    private notificationsService: NotificationsService,
    private uploadService: UploadsService,
    private authService: AuthService,
    private profilesService: ProfilesService,
  ) {
    this.suppBudgetForm = this.fb.group({
      eventId: ['', Validators.required],
      totalCost: ['', Validators.required],
      description: ['', Validators.required],
      file: [null],
    });
  }

  ngOnInit(): void {
    const user = this.authService.currentUser.value;
    this.profilesService.getProfileById(user.id)
      .then((profile) => {
        this.currentUser = profile[0]; // Assuming getProfileById returns an array
        console.log('user : ', this.currentUser);

        this.loadEvents();

      })
      .catch((error) => {
        console.error('Error fetching user profile:', error);
      });
  }

  loadEvents() {
    // Assuming ClubsService has a method to fetch events from the database
    this.clubsService.getClubEvents(this.currentUser.id_club).then((events) => {
      this.events = events;
      console.log(this.events);
    });
  }

  async handleSubmit(): Promise<void> {
    if (this.suppBudgetForm.valid) {
      const cost = this.suppBudgetForm.value.totalCost;
      const eventId = this.suppBudgetForm.value.eventId;
      const fileControl = this.suppBudgetForm.get('file');

      const event = await this.clubsService.getEventById(eventId);

      const request = 'Supplementary budget request to : ' + event[0].name;
      const description =
        'Request an amount of ' +
        cost +
        ' DH to the event ' +
        event[0].name +
        '\n ' +
        this.suppBudgetForm.value.description;
      const receivedDate = new Date().toISOString();

      let FileUrl: string | null = null;

      if (fileControl && fileControl.value) {
        const file: File = fileControl.value;
        console.log('File name:', file.name);

        try {
          // Upload the file and get the URL
          await this.uploadService.uploadEventBudget(file);

          // Assuming you have a method in clubsService to handle file upload
          FileUrl =
            'https://vussefkqdtgdosoytjch.supabase.co/storage/v1/object/public/Budget_event/' +
            file.name;
        } catch (error) {
          console.error('Error uploading file:', error);
          // Handle the error as needed
        }
      }

      const document: NewDocument = {
        name: request,
        id_event: eventId,
        state: 'pending',
        description: description,
        received_date: receivedDate,
        path: FileUrl,
      };

      try {
        await this.clubsService.addDocument(document);
        const club = await this.clubsService.getClubById(this.currentUser.id_club);
        if (club) {
          this.saveNotification(club[0].name);
        }
        // Set success message after successful submission
        this.successMessage = 'Request sent successfully';
      } catch (error) {
        console.error('Error adding document:', error);
        // Handle the error as needed
      } finally {
        setTimeout(() => {
          this.router.navigate(['/dashboard/clubFinance']);
        }, 2000); // Navigate after 2 seconds
      }
    }
  }

  //TODO: add the additional data ( id_activity , id_club, club_name) of the current user when addDocument

  onFileChange(event: any) {
    const fileInput = event.target;

    if (fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files[0];
      const fileControl = this.suppBudgetForm.get('file');

      // Update the form control with the selected file
      this.suppBudgetForm.patchValue({
        file: file,
      });

      // Trigger change detection to update the view
      if (fileControl) {
        fileControl.updateValueAndValidity();
      }
    }
  }
  saveNotification(clubName: string) {
    const notification: Notification = {
      date: new Date().toISOString(),
      title: 'Supplementary Budget Request',
      body: `A new supplementary budget request has been submitted by ${clubName}. Please review and approve.`,
      icon: 'attach_money', // Use 'attach_money' for the money-related icon
      to: 'admin',
      id_club: this.currentUser.id_club, 
    };

    this.notificationsService.addNotification(notification);
  }

}
