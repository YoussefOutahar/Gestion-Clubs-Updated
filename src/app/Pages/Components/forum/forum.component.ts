import { Component, OnInit } from '@angular/core';
import { Forum, ForumMessage } from '../../../DataBase/Models/club';
import { ClubsService } from '../../../DataBase/Services/clubs.service';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css'],
})
export class ForumComponent implements OnInit {
  forums: Forum[];
  messages: String[];
  message: string;

  selectedConversation: any;

  constructor(private ClubsService: ClubsService) {
    this.forums = [];
    this.messages = [
      'euhcfskeufkd',
      'oeuhcfawuhcauw',
      'euhcfskeufkd',
      'oeuhcfawuhcauw',
      'euhcfskeufkd',
      'oeuhcfawuhcauw',
    ];
    this.message = '';
  }

  ngOnInit() {
    this.ClubsService.getForums().then((forums) => {
      this.forums = forums;
    });
  }

  sendMessage() {}
}
