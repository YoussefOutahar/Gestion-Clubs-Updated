import { Component, OnInit } from '@angular/core';
import { NavService } from 'src/app/Services/nav.service';
import { navItems } from './sidebar-data';
import { navItems1 } from './sidebar-data-1';
import { navItems2 } from './sidebar-data-2';
import { navItems3 } from './sidebar-data-3';
@Component({
  selector: 'app-sidebar',
  templateUrl: './side-bar.component.html',
})
export class SideBarComponent implements OnInit {

  navItems = navItems;
  //managerRH
  navItems1= navItems1;
// 3actors
  navItems2 = navItems2;
  //administrateur
  navItems3 = navItems3;
  constructor(public navService: NavService) { }

  ngOnInit(): void {}

}