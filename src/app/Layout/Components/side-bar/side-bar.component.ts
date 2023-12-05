import { Component, OnInit } from '@angular/core';
import { NavService } from 'src/app/Services/nav.service';
import { NavItem } from './nav-item/nav-item';
// import { navItems } from './sidebar-data';

@Component({
  selector: 'app-sidebar',
  templateUrl: './side-bar.component.html',
})
export class SideBarComponent implements OnInit {
  navItems: NavItem[];

  constructor(public navService: NavService) {
    this.navItems = [];
  }

  ngOnInit(): void {
    this.loadNavItems();
  } 

  loadNavItems() {
    this.navService.getNavItems().then((navItems) => {
      this.navItems = navItems;
    });
  }
}
