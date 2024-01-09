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
      if (profile && profile.length > 0) {
        this.currentUser = profile[0];
  
        this.getPendingMembers();
      } else {
        // Handle the case where the profile is not found
        console.error('User profile not found.');
      }
    });
  }

  getPendingMembers() {
    this.profileService.getPendingMembers(this.currentUser.id_club).then((members) => {
      this.members = members;

      console.log(this.members);
    });
  }

  validateMember(member: PendingProfile) {
    this.profileService.validatePendingProfile(member);
    this.saveNotification(member);
    this.getPendingMembers();
  }

  cancelMember(member: PendingProfile) {
    this.profileService.deletePendingProfile(member);
    this.getPendingMembers();
  }


  saveNotification(member: PendingProfile) {
    const notification: Notification = {
      date: new Date().toISOString(),
      title: 'New member joined us',
      body: `Welcome ${member.name} to our community! We are excited to have you on board.`,
      icon: 'person',
      to: 'clubs',
      id_club: this.currentUser.id_club, 
    };
  
    this.notificationService.addNotification(notification);
  }
}
