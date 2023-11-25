import { Injectable } from '@angular/core';
import { Event, NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { NavItem } from '../Layout/Components/side-bar/nav-item/nav-item';
import { AuthService } from '../Auth/auth.service';

@Injectable({ providedIn: 'root' })
export class NavService {
  public currentUrl = new BehaviorSubject<any>(undefined);

  constructor(private router: Router, private authService: AuthService) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.currentUrl.next(event.urlAfterRedirects);
      }
    });
  }

  getNavItems = (): NavItem[] => {
    return this.navItems;
  };

  navItems: NavItem[] = [
    {
      navCap: 'Espace Admin',
    },
    {
      displayName: 'Dashboard',
      iconName: 'layout-dashboard',
      route: '/dashboard/home',
    },
    {
      displayName: 'Clubs',
      iconName: 'home',
      route: '/dashboard/clubs',
    },
    {
      displayName: 'Members',
      iconName: 'money',
      route: '/dashboard/members',
    },
    {
      displayName: 'Finance management',
      iconName: 'calendar',
      route: '/dashboard/finance',
    },
    {
      displayName: 'Events',
      iconName: 'people',
      route: '/dashboard/events',
    },
    {
      displayName: 'Validation Page',
      iconName: 'link',
      route: '/dashboard/validation',
    },

    // ====================================
    {
      navCap: 'Home',
    },
    {
      displayName: 'Dashboard',
      iconName: 'layout-dashboard',
      route: '/dashboard/dash',
    },
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
