import { Injectable } from '@angular/core';
import { Event, NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject, filter, map, take } from 'rxjs';
import { NavItem } from '../Layout/Components/side-bar/nav-item/nav-item';
import { AuthService } from '../Auth/auth.service';
import { ProfilesService } from '../DataBase/Services/profiles.service';

@Injectable({ providedIn: 'root' })
export class NavService {
  public currentUrl = new BehaviorSubject<any>(undefined);

  constructor(
    private router: Router,
    private authService: AuthService,
    private profilesService: ProfilesService
  ) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.currentUrl.next(event.urlAfterRedirects);
      }
    });
  }

  getNavItems = async (): Promise<NavItem[]> => {
    let privilege = this.authService.currentUser.getValue().user_metadata.role;

    if (privilege == 'admin') {
      return Promise.resolve(
        this.navItems.filter(
          (item) =>
            item.navCap == 'Espace Admin' ||
            item.route == '/dashboard/adminDashboard' ||
            item.displayName == 'Finance management' ||
            item.displayName == 'Events' ||
            item.displayName == 'Meetingss' ||
            item.displayName == 'Forum' ||
            item.displayName == 'Validation Page'
        )
      );
    } else {
      let id = this.authService.currentUser.getValue().id;
      let club_role = await this.profilesService.getProfileRole(id);
      switch (club_role) {
        case 'President':
          this.navItems = this.navItems.filter(
            (item) =>
              item.route == '/dashboard/clubDashboard' ||
              item.displayName == 'Club Finance management' ||
              item.displayName == 'Events' ||
              item.displayName == 'Meetingss' ||
              item.displayName == 'Forum' ||
              item.displayName == 'Members Validation'
          );
          break;
        case 'VicePresident':
          this.navItems = this.navItems.filter(
            (item) =>
              item.route == '/dashboard/clubDashboard' ||
              item.displayName == 'Club Finance management' ||
              item.displayName == 'Events' ||
              item.displayName == 'Meetingss' ||
              item.displayName == 'Forum' ||
              item.displayName == 'Members Validation'
          );
          break;
        case 'Secretary':
          this.navItems = this.navItems.filter(
            (item) =>
              item.displayName == 'Club Finance management' ||
              item.displayName == 'Events' ||
              item.displayName == 'Forum' ||
              item.displayName == 'Meetingss'
          );
          break;
        case 'Accountant':
          this.navItems = this.navItems.filter(
            (item) =>
              item.displayName == 'Club Finance management' ||
              item.displayName == 'Events' ||
              item.displayName == 'Forum' ||
              item.displayName == 'Meetingss'
          );
          break;
        case 'Member':
          this.navItems = this.navItems.filter(
            (item) =>
              item.displayName == 'Forum' ||
              item.displayName == 'Events' ||
              item.displayName == 'Meetingss'
          );
          break;

        default:
          break;
      }
      return Promise.resolve(this.navItems);
    }
  };

  navItems: NavItem[] = [
    {
      navCap: 'Espace Admin',
    },
    {
      displayName: 'Dashboard',
      iconName: 'layout-dashboard',
      route: '/dashboard/adminDashboard',
    },
    {
      displayName: 'Dashboard',
      iconName: 'layout-dashboard',
      route: '/dashboard/clubDashboard',
    },
    {
      displayName: 'Clubs',
      iconName: 'home',
      route: '/dashboard/clubs',
    },
    {
      displayName: 'Members',
      iconName: 'users',
      route: '/dashboard/members',
    },
    {
      displayName: 'Finance management',
      iconName: 'pig-money',
      route: '/dashboard/finance',
    },
    {
      displayName: 'Club Finance management',
      iconName: 'pig-money',
      route: '/dashboard/clubFinance',
    },
    {
      displayName: 'Events',
      iconName: 'speakerphone',
      route: '/dashboard/events',
    },
    {
      displayName: 'Meetingss',
      iconName: 'calendar-time',
      route: '/dashboard/meetings',
    },
    {
      displayName: 'Forum',
      iconName: 'calendar-time',
      route: '/dashboard/forum',
    },
    {
      displayName: 'Validation Page',
      iconName: 'link',
      route: '/dashboard/validation',
    },
    {
      displayName: 'Members Validation',
      iconName: 'link',
      route: '/dashboard/membersValidation',
    },

    // ====================================
    {
      navCap: 'Ui Components',
    },
    {
      displayName: 'Badge',
      iconName: 'rosette',
      route: '/ui-components/badge',
    },
    {
      displayName: 'Chips',
      iconName: 'poker-chip',
      route: '/ui-components/chips',
    },
    {
      displayName: 'Lists',
      iconName: 'list',
      route: '/ui-components/lists',
    },
    {
      displayName: 'Menu',
      iconName: 'layout-navbar-expand',
      route: '/ui-components/menu',
    },
    {
      displayName: 'Tooltips',
      iconName: 'tooltip',
      route: '/ui-components/tooltips',
    },
    {
      navCap: 'Extra',
    },
    {
      displayName: 'Icons',
      iconName: 'mood-smile',
      route: '/extra/icons',
    },
    {
      displayName: 'Sample Page',
      iconName: 'aperture',
      route: '/extra/sample-page',
    },
  ];
}
