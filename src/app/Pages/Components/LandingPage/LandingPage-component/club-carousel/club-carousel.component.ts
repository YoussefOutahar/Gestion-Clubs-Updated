import { Component, OnInit } from '@angular/core';
import { Club } from 'src/app/DataBase/Models/club';
import { ClubsService } from 'src/app/DataBase/Services/clubs.service';

@Component({
    selector: 'app-carousel-clubs',
    templateUrl: './club-carousel.component.html',
    styleUrls: ['./club-carousel.component.css']
})
export class CarouselClubsComponent implements OnInit {
    clubs: Club[] = [];

    constructor(
        private clubsService: ClubsService
    ) { }

    ngOnInit() {
        this.getActiveClubs();
    }

    getActiveClubs() {
        this.clubsService.getActiveClubs().then(clubs => {
            this.clubs = clubs;
            console.log(this.clubs);
        });
    }
}
