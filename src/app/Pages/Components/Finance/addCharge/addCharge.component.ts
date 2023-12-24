// assign-budget.component.ts

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClubsService } from '../../../../DataBase/Services/clubs.service';
import { UploadsService } from '../../../../DataBase/Services/uploads.service';
import { User } from '@supabase/supabase-js';
import { AuthService } from '../../../../Auth/auth.service';
import { ProfilesService } from '../../../../DataBase/Services/profiles.service';


@Component({
  selector: 'app-assign-budget',
  templateUrl: './addCharge.component.html',
  styleUrls: ['./addCharge.component.css'],
})
export class AddChargeComponent implements OnInit {
  currentUser: boolean | User | any;
  chargeForm: FormGroup;
  events: any[] = [];

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private clubsService: ClubsService,
    private uploadService: UploadsService,
    private authService: AuthService,
    private profilesService: ProfilesService,
  ) {
    this.chargeForm = this.fb.group({
      eventId: [null, Validators.required],
      totalCost: ['', [Validators.required, Validators.min(0)]],
      earnings: ['', [Validators.required, Validators.min(0)]],
      file: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    // Get the current user data
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

  async onSubmit() {
    // Handle form submission here
    if (this.chargeForm.valid) {
      const eventId = this.chargeForm.value.eventId;
      const totalCost = this.chargeForm.value.totalCost;
      const earnings = this.chargeForm.value.earnings;
      const fileControl = this.chargeForm.get('file');

      if (fileControl && fileControl.value) {
        const file: File = fileControl.value;
        console.log('File name:', file.name);

        try {
          // Upload the file and get the URL
          await this.uploadService.uploadEventBudget(file);

          // Assuming you have a method in clubsService to handle file upload
          const FileUrl =
            'https://vussefkqdtgdosoytjch.supabase.co/storage/v1/object/public/Budget_event/' +
            file.name;

          // Update the event with the new values
          const updatedEvent = {
            earnings: earnings,
            cost: totalCost,
            url: FileUrl,
            file_name: file.name,
          };

          await this.clubsService.updateEvent(eventId, updatedEvent);

          // Update successful, do any additional logic if needed
        } catch (error) {
          console.error('Error updating event:', error);
          // Handle the error as needed
        } finally {
          this.router.navigate(['/dashboard/clubFinance']);
        }
      } else {
        // Handle the case where no file is selected
        console.error('Please select a file.');
      }
    }
  }

  loadEvents() {
    // Assuming ClubsService has a method to fetch events from the database
    this.clubsService.getClubEvents(this.currentUser.id_club).then((events) => {
      this.events = events;
      console.log(this.events);
    });
  }

  onFileChange(event: any) {
    const fileInput = event.target;

    if (fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files[0];
      const fileControl = this.chargeForm.get('file');

      // Update the form control with the selected file
      this.chargeForm.patchValue({
        file: file,
      });

      // Trigger change detection to update the view
      if (fileControl) {
        fileControl.updateValueAndValidity();
      }
    }
  }
}
