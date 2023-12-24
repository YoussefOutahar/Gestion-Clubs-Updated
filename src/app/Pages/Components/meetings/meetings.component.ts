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


@Component({
  selector: 'app-meetings',
  templateUrl: './meetings.component.html',
})
export class MeetingsComponent implements OnInit {
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
  ) { }

  ngOnInit() {
    // Get the current user data
    const user = this.authService.currentUser.value;
    this.profilesService.getProfileById(user.id)
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
    this.clubService.getClubMeetings(this.currentUser.id_club).then((meetings) => {
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
        color: this.darkColorRandomizerGenerator(),
      })
    );
  }
  darkColorRandomizerGenerator() {
    const red = Math.floor(Math.random() * 128);
    const green = Math.floor(Math.random() * 128);
    const blue = Math.floor(Math.random() * 128);
    return `#${red.toString(16)}${green.toString(16)}${blue.toString(16)}`;
  }

  handleDateSelect(selectInfo: DateSelectArg) {
    // const title = prompt('Please enter a new title for your event');
    // const calendarApi = selectInfo.view.calendar;
    // calendarApi.unselect(); // clear date selection
    // if (title) {
    //   calendarApi.addEvent({
    //     id: createEventId(),
    //     title,
    //     start: selectInfo.startStr,
    //     end: selectInfo.endStr,
    //     allDay: selectInfo.allDay
    //   });
    // }
  }

  handleEventClick(clickInfo: EventClickArg) {
    if (
      confirm(
        `Are you sure you want to delete the event '${clickInfo.event.title}'`
      )
    ) {
      clickInfo.event.remove();
    }
  }
}
