import { Component, OnInit } from '@angular/core';
import { User } from '@supabase/supabase-js';
import { AuthService } from '../../../../Auth/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { ProfilesService } from '../../../../DataBase/Services/profiles.service';
import { NotificationsService } from '../../../../DataBase/Services/notifications.service';
import { Notification } from '../../../../DataBase/Models/notification';
import { PendingProfile } from '../../../../DataBase/Models/profile';

@Component({
  selector: 'app-membersvalidation',
  templateUrl: './membersvalidation.component.html',
  styleUrls: ['./membersvalidation.component.css'],
})
export class MembersValidationComponent implements OnInit {
  currentUser: boolean | User | any;
  members: PendingProfile[] = [];

  constructor(
    private authService: AuthService,
    private profileService : ProfilesService,
    public dialog: MatDialog,
    private notificationService: NotificationsService,
  ) {}

  ngOnInit() {
    // Get the current user data
    const user = this.authService.currentUser.value;
    this.currentUser = this.profileService.getProfileById(user.id).then((profile) => {
      this.currentUser = profile[0]; // Assuming getProfileById returns an array
      console.log('user : ', this.currentUser);
    });

    this.getPendingMembers();

    console.log(this.currentUser.role);
  }

  getPendingMembers() {
    this.profileService.getPendingProfiles().then((members) => {
      this.members = members;

      console.log(this.members);
    });
  }

  validateMember(member: PendingProfile) {
    
    this.saveNotification();
  }

  cancelMember(member: PendingProfile) {
    
  }


  saveNotification() {
    const notification: Notification = {
      date: new Date().toISOString(),
      title: 'New member joined us',
      body: ``,
      icon: 'person',
      to: 'clubs',
      id_club: this.currentUser.id_club, 
    };
  
    this.notificationService.addNotification(notification);
  }
}
