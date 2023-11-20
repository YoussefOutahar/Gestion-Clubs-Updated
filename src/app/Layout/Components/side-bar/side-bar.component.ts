import { Component, OnInit } from '@angular/core';
import { NavService } from 'src/app/Services/nav.service';
import { navItems } from './sidebar-data';

@Component({
  selector: 'app-sidebar',
  templateUrl: './side-bar.component.html',
})
export class SideBarComponent implements OnInit {

  navItems = navItems;
  
  constructor(public navService: NavService) { }

  ngOnInit(): void {}

}