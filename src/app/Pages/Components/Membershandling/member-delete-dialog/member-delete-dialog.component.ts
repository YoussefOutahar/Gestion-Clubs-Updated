import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Profile } from '../../../../DataBase/Models/profile';

@Component({
  selector: 'app-member-delete-dialog',
  templateUrl: './member-delete-dialog.component.html',
})
export class MemberDeleteDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<MemberDeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Profile
  ) {}

  ngOnInit() {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onDeleteClick(): void {
    // Implement logic to delete the user from the database
    console.log('User deleted:', this.data);
    this.dialogRef.close(true);
  }
}
