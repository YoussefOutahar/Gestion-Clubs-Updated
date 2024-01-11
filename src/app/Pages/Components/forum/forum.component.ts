import { Component, OnInit } from '@angular/core';
import { Forum, ForumMessage } from '../../../DataBase/Models/club';
import { ClubsService } from '../../../DataBase/Services/clubs.service';
import { AuthService } from '../../../Auth/auth.service';
import { ProfilesService } from '../../../DataBase/Services/profiles.service';
import { User } from '@supabase/supabase-js';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css'],
})
export class ForumComponent implements OnInit {
  currentUser: boolean | User | any;

  forum?: Forum;
  messages: ForumMessage[] = [];
  message: string = '';

  constructor(
    private ClubsService: ClubsService,
    private authService: AuthService,
    private profilesService: ProfilesService
  ) {}

  ngOnInit() {
    // Get the current user data
    const user = this.authService.currentUser.value;
    this.profilesService
      .getProfileById(user.id)
      .then((profile) => {
        this.currentUser = profile[0]; // Assuming getProfileById returns an array
        console.log('user : ', this.currentUser.id_club);
        this.ClubsService.getClubForums(this.currentUser.id_club)
          .then((forums) => {
            this.forum = forums[0];
            this.ClubsService.getForumMessages(this.forum!)
              .then((messages) => {
                this.messages = messages;
                console.log('messages : ', this.messages);
              })
              .catch((error) => {
                console.error('Error fetching messages:', error);
              });
            console.log('current User : ', this.currentUser);
            console.log('messages : ', this.messages);
          })
          .catch((error) => {
            console.error('Error fetching forums:', error);
          });
      })
      .catch((error) => {
        console.error('Error fetching user profile:', error);
      });
  }

  sendMessage() {
    const message: ForumMessage = {
      user_id: this.currentUser.id,
      forum_id: this.forum!.id!,
      content: this.message,
      created_at: new Date().toISOString(),
      userName: this.currentUser.name,
    };
    this.ClubsService.sendMessage(message);

    this.message = '';
    this.ClubsService.getForumMessages(this.forum!).then((messages) => {
      this.messages = messages;
      window.location.reload();
    });
  }
}
