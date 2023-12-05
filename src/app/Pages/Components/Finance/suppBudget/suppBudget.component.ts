// suppBudget.component.ts

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Document } from 'src/app/DataBase/Models/club';
import { ClubsService } from 'src/app/DataBase/Services/clubs.service';
import { NotificationsService } from 'src/app/DataBase/Services/notifications.service';

@Component({
    selector: 'app-suppBudget',
    templateUrl: './suppBudget.component.html',
    styleUrls: ['./suppBudget.component.css'],
})
export class SuppBudgetComponent implements OnInit {
    suppBudgetForm!: FormGroup;
    events: any[] = [];


    constructor(private router: Router, private clubsService: ClubsService, private fb: FormBuilder, private notificationsService: NotificationsService) {
        this.suppBudgetForm = this.fb.group({
            eventId: ['', Validators.required],
            totalCost: ['', Validators.required],
            description: ['', Validators.required],
        });
    }

    ngOnInit(): void {
        this.loadEvents();
    }

    loadEvents() {
        // Assuming ClubsService has a method to fetch events from the database
        this.clubsService.getEvents().then(events => { this.events = events; console.log(this.events); });

    }

    async handleSubmit(): Promise<void> {
        if (this.suppBudgetForm.valid) {
            const cost = this.suppBudgetForm.value.totalCost;
            const eventId = this.suppBudgetForm.value.eventId;

            const event = await this.clubsService.getEventById(eventId);

            const request = "Supplementary budget request to : " + event[0].name;
            const description = "Request an amount of " +cost+" DH to the event "+event[0].name +"\n "+ this.suppBudgetForm.value.description;
            const receivedDate = new Date().toISOString();

            const document: Document = {
                name: request,
                id_activity: eventId,
                ref_validation: false,
                dve_validation: false,
                description: description,
                received_date: receivedDate,
            };

            console.log('Document:', document);

            await this.clubsService.addDocument(document);

            this.router.navigate(['/dashboard/clubFinance']);

            /*const notification = {
              heading: 'Request',
              title: 'Supplementary budget request',
              subtitle: eventName,
              timestamp: new Date(),
              body: `Request an amount of ${cost} DH to the event ${eventName}`,
              icon: {
                name: 'Message',
                color: 'primary',
              },
              // Adjust the path as needed
              path: `validationPage/${cost}/${eventName}`,
              // Assuming you have a method to get the clubId from the service
              id_club: this.getClubId(),
            };
      
            try {
              // Assuming you have a method to add notifications in your service
              //const result = this.notificationsService.addNotification(notification);
              this.router.navigate(['/finance']);
            } catch (error) {
              console.error(error);
            }*/
        }
    }

    //TODO: add the additional data ( id_activity , id_club, club_name) of the current user when addDocument

}
