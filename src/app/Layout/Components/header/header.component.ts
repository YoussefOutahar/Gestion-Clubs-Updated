import {
  Component,
  Output,
  EventEmitter,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from './../../../Auth/auth.service';
import { NotificationsService } from './../../../DataBase/Services/notifications.service';

import { Notification } from './../../../DataBase/Models/notification';
import { User } from '@supabase/supabase-js';
import { ProfilesService } from '../../../DataBase/Services/profiles.service';
import { NotificationDetailsDialogComponent } from '../notificationDialog/notification-dialog.component';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class HeaderComponent {
  currentUser: boolean | User | any;

  @Input() showToggle = true;
  @Input() toggleChecked = false;
  @Output() toggleMobileNav = new EventEmitter<void>();
  @Output() toggleMobileFilterNav = new EventEmitter<void>();
  @Output() toggleCollapsed = new EventEmitter<void>();

  notifications: Notification[] = [];

  showFiller = true;

  constructor(
    public dialog: MatDialog,
    private auth: AuthService,
    private notificationsService: NotificationsService,
    private router: Router,
    private profilesService: ProfilesService,
  ) {}

  async ngOnInit() {
    // Get the current user data
    const user = this.auth.currentUser.value;
    this.profilesService.getProfileById(user.id)
      .then((profile) => {
        this.currentUser = profile[0]; // Assuming getProfileById returns an array
        console.log('user : ', this.currentUser);

        this.loadNotifications();

      })
      .catch((error) => {
        console.error('Error fetching user profile:', error);
      });
  }

  async loadNotifications() {
    try {
      this.notifications = await this.notificationsService.getClubAndNullNotifications(this.currentUser.id_club);
      console.log('Notifications :', this.notifications);
    } catch (error) {
      console.error('Error loading notifications:', error);
    }
  }

  handleNotificationClick(notification: Notification) {
    // Open the notification details dialog
    const dialogRef = this.dialog.open(NotificationDetailsDialogComponent, {
      data: notification,
    });

    // You can subscribe to the afterClosed event if you want to do something after the dialog is closed
    dialogRef.afterClosed().subscribe(result => {
      // Handle any result if needed
      console.log('Dialog closed:', result);
    });
  }

  async logout() {
    console.log('loging out...');
    await this.auth.logout();
    this.router.navigate(['/session/authenticate']);
    console.log('logged out');
  }

  async navigateToProfile() {
    // Navigate to the profile component
    this.router.navigate(['/dashboard/profile']);
  }
}
