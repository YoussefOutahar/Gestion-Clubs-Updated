import { ChangeDetectorRef, Component, OnInit, signal } from '@angular/core';
import {
  CalendarOptions,
  DateSelectArg,
  EventApi,
  EventClickArg,
  EventInput,
} from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import { Meeting } from '../../../DataBase/Models/club';
import { ClubsService } from '../../../DataBase/Services/clubs.service';
import { User } from '@supabase/supabase-js';
import { AuthService } from '../../../Auth/auth.service';
import { ProfilesService } from '../../../DataBase/Services/profiles.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AddMeetingRequestComponent } from './addMeetingRequest/addMeetingRequest.component';
import { MeetingsDetailsComponent } from './meetingsDetails/meetingsDetails.component';

@Component({
  selector: 'app-meetings',
  templateUrl: './meetings.component.html',
  providers: [DialogService],
})
export class MeetingsComponent implements OnInit {
  ref: DynamicDialogRef | undefined;

  currentUser: boolean | User | any;
  calendarOptions: CalendarOptions = {
    plugins: [interactionPlugin, dayGridPlugin, timeGridPlugin, listPlugin],
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
    },
    initialView: 'dayGridMonth',
    events: [],
    weekends: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
  };

  constructor(
    private clubService: ClubsService,
    private changeDetector: ChangeDetectorRef,
    private authService: AuthService,
    private profilesService: ProfilesService,
    public dialogService: DialogService
  ) {}

  ngOnInit() {
    // Get the current user data
    const user = this.authService.currentUser.value;
    this.profilesService
      .getProfileById(user.id)
      .then((profile) => {
        this.currentUser = profile[0]; // Assuming getProfileById returns an array
        console.log('user : ', this.currentUser);

        this.loadMeetings();
        this.changeDetector.detectChanges();
      })
      .catch((error) => {
        console.error('Error fetching user profile:', error);
      });
  }

  loadMeetings() {
    this.clubService
      .getClubMeetings(this.currentUser.id_club)
      .then((meetings) => {
        console.log(meetings);
        console.log(this.formatEvents(meetings));
        this.calendarOptions.events = this.formatEvents(meetings);
      });
  }

  formatEvents(meetings: Meeting[]) {
    return meetings.map(
      (meeting): EventInput => ({
        id: meeting.id!.toString(),
        title: `${meeting.location}`,
        date: meeting.date,
      })
    );
  }

  getRandomSeverity() {
    const severities = ['success', 'info', 'warning', 'danger'];
    const randomIndex = Math.floor(Math.random() * 4);
    return severities[randomIndex];
  }

  handleDateSelect(selectInfo: DateSelectArg) {}

  handleEventClick(clickInfo: EventClickArg) {
    this.ref = this.dialogService.open(MeetingsDetailsComponent, {
      header: 'Meeting Details',
      width: '70%',
      data: {
        meeting: clickInfo.event.id,
      },
    });
  }
}
