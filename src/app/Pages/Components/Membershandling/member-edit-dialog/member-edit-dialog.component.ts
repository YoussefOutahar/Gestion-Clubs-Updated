import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Profile } from '../../../../DataBase/Models/profile';
import { ProfilesService } from '../../../../DataBase/Services/profiles.service';
import { DropdownModule } from 'primeng/dropdown';


@Component({
  selector: 'app-member-edit-dialog',
  templateUrl: './member-edit-dialog.component.html',
  styleUrls: ['./member-edit-dialog.component.css'],
})
export class MemberEditDialogComponent implements OnInit {
  roleOptions = [
    { label: 'President', value: 'President' },
    { label: 'Vice-President', value: 'Vice-President' },
    { label: 'Accountant', value: 'Accountant' },
    { label: 'Secretary', value: 'Secretary' },
    { label: 'Member', value: 'Member' }
  ];
  constructor(
    public dialogRef: MatDialogRef<MemberEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Profile,
    private profilesService: ProfilesService  // Inject the ProfilesService
  ) {}

  ngOnInit() {}

  async onNoClick(): Promise<void> {
    // Close the dialog without saving changes
    this.dialogRef.close();
  }

  async onSaveClick(): Promise<void> {
    try {
      // Save changes to the user profile
      await this.profilesService.updateProfile(this.data);
      // Close the dialog after successfully updating the profile
      this.dialogRef.close();
    } catch (error) {
      console.error('Error updating profile:', error);
      // Handle error as needed (e.g., show error message)
    }
  }
}
