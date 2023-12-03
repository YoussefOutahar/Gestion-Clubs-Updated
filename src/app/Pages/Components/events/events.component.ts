import { ChangeDetectorRef, Component, OnInit, signal } from '@angular/core';
import {
  CalendarOptions,
  DateSelectArg,
  EventClickArg,
  EventInput,
} from '@fullcalendar/core';
import { Event } from 'src/app/DataBase/Models/club';
import { ClubsService } from 'src/app/DataBase/Services/clubs.service';

import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import { createEventId } from './events-utils';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css'],
})
export class EventsComponent implements OnInit {
  calendarOptions: CalendarOptions = {
    plugins: [interactionPlugin, dayGridPlugin, timeGridPlugin, listPlugin],
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
    },
    initialView: 'dayGridMonth',
    events: [
    ],
    // eventsSet: this.handleEvents.bind(this),
    weekends: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
  };

  constructor(
    private clubsService: ClubsService,
    private changeDetector: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.loadEvents();
    this.changeDetector.detectChanges();
  }

  loadEvents() {
    this.clubsService.getEvents().then((events) => {
      console.log(events);
      console.log(this.formatEvents(events));
      this.calendarOptions.events = this.formatEvents(events);
    });
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
    //     allDay: selectInfo.allDay,
    //   });
    // }
  }

  handleEventClick(clickInfo: EventClickArg) {
    // if (
    //   confirm(
    //     `Are you sure you want to delete the event '${clickInfo.event.title}'`
    //   )
    // ) {
    //   clickInfo.event.remove();
    // }
  }

  // handleEvents(events: EventApi[]) {
  //   this.currentEvents.set(events);
  //   this.changeDetector.detectChanges(); // workaround for pressionChangedAfterItHasBeenCheckedError
  // }

  formatEvents(events: Event[]) {
    return events.map((event): EventInput => ({
      id: event.id.toString(),
      title: `${event.name}`,
      date: event.date,
      color: this.darkColorRandomizerGenerator(),
    }));
  }
  darkColorRandomizerGenerator() {
    const red = Math.floor(Math.random() * 128);
    const green = Math.floor(Math.random() * 128);
    const blue = Math.floor(Math.random() * 128);
    return `#${red.toString(16)}${green.toString(16)}${blue.toString(16)}`;
  }
}
