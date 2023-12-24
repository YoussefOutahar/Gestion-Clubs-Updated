import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Profile } from '../../../../DataBase/Models/profile';
import { ProfilesService } from '../../../../DataBase/Services/profiles.service';

@Component({
  selector: 'app-member-delete-dialog',
  templateUrl: './member-delete-dialog.component.html',
})
export class MemberDeleteDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<MemberDeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Profile,
    private profilesService: ProfilesService  // Inject the ProfilesService
  ) {}

  ngOnInit() {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  async onDeleteClick(): Promise<void> {
    try {
      // Save changes to the user profile
      await this.profilesService.deleteProfile(this.data);
      // Close the dialog after successfully updating the profile
      this.dialogRef.close();
    } catch (error) {
      console.error('Error deleting profile:', error);
      // Handle error as needed (e.g., show error message)
    }
  }
}
