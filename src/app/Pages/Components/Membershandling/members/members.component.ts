import { Component, OnInit } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { MemberDeleteDialogComponent } from '../member-delete-dialog/member-delete-dialog.component';
import { MemberEditDialogComponent } from '../member-edit-dialog/member-edit-dialog.component';

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
    const dialogRef = this.dialog.open(MemberEditDialogComponent, {
      width: '400px',
      data: user,
    });

    dialogRef.afterClosed().subscribe(result => {
      // Handle the result after the dialog is closed, e.g., update user details
      if (result) {
        console.log('User details saved:', result);
        // Implement logic to update user details in the database
      }
    });
  }

  openDeleteDialog(user: Profile): void {
    const dialogRef = this.dialog.open(MemberDeleteDialogComponent, {
      width: '400px',
      data: user,
    });

    dialogRef.afterClosed().subscribe(result => {
      // Handle the result after the dialog is closed, e.g., delete user
      if (result) {
        console.log('User deleted:', result);
        // Implement logic to delete user details from the database
        this.loadUsers(); // Reload users after deletion
      }
    });
  }

}
