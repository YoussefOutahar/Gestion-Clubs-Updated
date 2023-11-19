import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Profile } from 'src/app/DataBase/Models/profile';
import { ProfilesService } from 'src/app/DataBase/Services/profiles.service';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit {

  users: Profile[] = [];
  
  displayedColumns: string[] = ['name', 'email', 'role', 'actions'];

  constructor(
    private profilesService: ProfilesService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.loadUsers();
  }

  async loadUsers() {
    try {
      this.users = await this.profilesService.getProfiles();
    } catch (error) {
      console.error('Error loading users:', error);
    }
  }

  openEditDialog(user: Profile): void {
    // Implement a dialog for editing user details
    // Example: this.dialog.open(UserEditDialogComponent, { data: user });
  }

  openDeleteDialog(user: Profile): void {
    // Implement a dialog for confirming user deletion
    // Example: this.dialog.open(UserDeleteDialogComponent, { data: user });
  }

}
