import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Club } from '../../../../DataBase/Models/club';
import { Profile } from '../../../../DataBase/Models/profile';

@Component({
  selector: 'app-validation-showDetails',
  templateUrl: './validation-showDetails.component.html',
})
export class ValidationDetailstDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<ValidationDetailstDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Club
  ) {}

  ngOnInit() {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
