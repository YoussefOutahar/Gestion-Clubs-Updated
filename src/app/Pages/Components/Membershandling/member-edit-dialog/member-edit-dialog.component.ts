import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Profile } from 'src/app/DataBase/Models/profile';

@Component({
  selector: 'app-member-edit-dialog',
  templateUrl: './member-edit-dialog.component.html',
})
export class MemberEditDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<MemberEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Profile
  ) {}

  ngOnInit() {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
