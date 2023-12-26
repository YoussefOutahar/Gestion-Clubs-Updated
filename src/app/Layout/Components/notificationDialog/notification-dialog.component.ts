// notification-details-dialog.component.ts
import { Component, Inject ,OnInit} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Notification } from './../../../DataBase/Models/notification';

@Component({
    selector: 'app-notification-dialog',
    templateUrl: './notification-dialog.component.html',
})
export class NotificationDetailsDialogComponent implements OnInit {
    constructor(@Inject(MAT_DIALOG_DATA) public data: Notification,
    public dialogRef: MatDialogRef<NotificationDetailsDialogComponent>,
    ) { }

    ngOnInit() { }

}
