// suppBudget.component.ts

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NewDocument } from '../../../../DataBase/Models/club';
import { ClubsService } from '../../../../DataBase/Services/clubs.service';
import { NotificationsService } from '../../../../DataBase/Services/notifications.service';
import { UploadsService } from '../../../../DataBase/Services/uploads.service';

@Component({
  selector: 'app-suppBudget',
  templateUrl: './suppBudget.component.html',
  styleUrls: ['./suppBudget.component.css'],
})
export class SuppBudgetComponent implements OnInit {
  suppBudgetForm!: FormGroup;
  events: any[] = [];
  successMessage: string | null = null;

  constructor(
    private router: Router,
    private clubsService: ClubsService,
    private fb: FormBuilder,
    private notificationsService: NotificationsService,
    private uploadService: UploadsService
  ) {
    this.suppBudgetForm = this.fb.group({
      eventId: ['', Validators.required],
      totalCost: ['', Validators.required],
      description: ['', Validators.required],
      file: [null],
    });
  }

  ngOnInit(): void {
    this.loadEvents();
  }

  loadEvents() {
    // Assuming ClubsService has a method to fetch events from the database
    this.clubsService.getEvents().then((events) => {
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

      /*const notification = {
              heading: 'Request',
              title: 'Supplementary budget request',
              subtitle: eventName,
              timestamp: new Date(),
              body: `Request an amount of ${cost} DH to the event ${eventName}`,
              icon: {
                name: 'Message',
                color: 'primary',
              },
              // Adjust the path as needed
              path: `validationPage/${cost}/${eventName}`,
              // Assuming you have a method to get the clubId from the service
              id_club: this.getClubId(),
            };
      
            try {
              // Assuming you have a method to add notifications in your service
              //const result = this.notificationsService.addNotification(notification);
              this.router.navigate(['/finance']);
            } catch (error) {
              console.error(error);
            }*/
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
}
