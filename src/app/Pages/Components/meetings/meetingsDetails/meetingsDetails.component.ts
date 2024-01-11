import { Component, OnInit } from '@angular/core';
import {
  DialogService,
  DynamicDialogConfig,
  DynamicDialogRef,
} from 'primeng/dynamicdialog';
import { Meeting } from '../../../../DataBase/Models/club';
import { ClubsService } from '../../../../DataBase/Services/clubs.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-meetingsDetails',
  templateUrl: './meetingsDetails.component.html',
  providers: [DialogService, DatePipe],
})
export class MeetingsDetailsComponent implements OnInit {
  meeting?: Meeting;

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private clubService: ClubsService
  ) {
    const meetingId = config.data.meetingId;
    this.clubService.getMeetingById(meetingId).then((meeting) => {
      this.meeting = meeting[0];
    });
  }

  ngOnInit() {}
}
