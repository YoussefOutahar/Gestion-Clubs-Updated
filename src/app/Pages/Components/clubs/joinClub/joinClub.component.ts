import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClubsService } from '../../../../DataBase/Services/clubs.service';
import { ProfilesService } from '../../../../DataBase/Services/profiles.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-join-form',
  templateUrl: './joinClub.component.html',
  styleUrls: ['./joinClub.component.css'],
})
export class JoinFormComponent implements OnInit {
  @Input() showForm: boolean = false;
  @Input() clubName: string = '';
  joinForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private profileService: ProfilesService,
    private clubsService: ClubsService,
    public dialogRef: MatDialogRef<JoinFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: number

  ) {
    this.joinForm = this.fb.group({
      name: [null, Validators.required],
      year: [null, Validators.required],
      field: [null, Validators.required],
      mail: [null, [Validators.required, Validators.email]],
      phone: [null, Validators.required],
    });
  }

  async ngOnInit() {
    try {
      const club = await this.clubsService.getClubById(this.data);
      this.clubName = club[0].name;
    } catch (error) {
      console.error('Error fetching club:', error);
    }
  }

  async onNoClick(): Promise<void> {
    // Close the dialog without saving changes
    this.dialogRef.close();
  }

  async onSubmit() {
    if (this.joinForm.valid) {
      const user = {
        name: this.joinForm.value.name,
        year: this.joinForm.value.year,
        field: this.joinForm.value.field,
        email: this.joinForm.value.mail,
        phone: this.joinForm.value.phone,
        id_club: this.data,
        role_club: 'Member',
        state: 'Pending',
      };

      console.log('Club id',this.data);

      try {
        await this.profileService.addProfile(user);
        console.log('User added successfully!');
        this.dialogRef.close();
        // Optionally, you can close the dialog here
      } catch (error) {
        console.error('Error adding user:', error);
      }
    }
  }
}
