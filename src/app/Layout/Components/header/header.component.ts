import {
  Component,
  Output,
  EventEmitter,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Auth/auth.service';
import { NotificationsService } from 'src/app/DataBase/Services/notifications.service';

import { Notification } from 'src/app/DataBase/Models/notification';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class HeaderComponent {
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
    private router: Router
  ) {}

  async ngOnInit() {
    this.loadNotifications();
  }

  async loadNotifications() {
    try {
      this.notifications = await this.notificationsService.getNotifications();
    } catch (error) {
      console.error('Error loading notifications:', error);
    }
  }

  handleNotificationClick(notification: Notification) {
    // Handle notification click, e.g., navigate to a specific page
    console.log('Notification clicked:', notification);
  }

  async logout() {
    console.log('loging out...');
    await this.auth.logout();
    this.router.navigate(['/session/authenticate']);
    console.log('logged out');
  }
}
