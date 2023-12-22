import { Component, OnInit } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { MemberDeleteDialogComponent } from '../member-delete-dialog/member-delete-dialog.component';
import { MemberEditDialogComponent } from '../member-edit-dialog/member-edit-dialog.component';

import { Profile } from '../../../../DataBase/Models/profile';
import { AuthService } from '../../../../Auth/auth.service';
import { ProfilesService } from '../../../../DataBase/Services/profiles.service';
import { User } from '@supabase/supabase-js';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css'],
})
export class MembersComponent implements OnInit {
  users: Profile[] = [];
  currentUser: boolean | User | any;

  displayedColumns: string[] = ['name', 'email', 'role', 'phone', 'field', 'year', 'actions'];

  constructor(
    private profilesService: ProfilesService,
    private authService: AuthService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    // Get the current user data
    const user = this.authService.currentUser.value;
    this.profilesService.getProfileById(user.id)
      .then((profile) => {
        this.currentUser = profile[0]; // Assuming getProfileById returns an array
        console.log('user : ', this.currentUser);
  
        // Load users and log them inside the loadUsers function
        this.loadUsers();
      })
      .catch((error) => {
        console.error('Error fetching user profile:', error);
      });
  }

  async loadUsers() {
    try {
      if (this.currentUser && this.currentUser.role === 'admin') {
        // Load all profiles for admin users
        this.users = await this.profilesService.getProfiles();
      } else if (this.currentUser && this.currentUser.role === 'user') {
        // Load profiles for regular users based on their club
        this.users = await this.profilesService.getProfileByClub(this.currentUser.id_club);
      }
    } catch (error) {
      console.error('Error loading users:', error);
    }
  }
  

  openEditDialog(user: Profile): void {
    const dialogRef = this.dialog.open(MemberEditDialogComponent, {
      width: '400px',
      data: user,
    });

    dialogRef.afterClosed().subscribe((result) => {
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

    dialogRef.afterClosed().subscribe((result) => {
      // Handle the result after the dialog is closed, e.g., delete user
      if (result) {
        console.log('User deleted:', result);
        // Implement logic to delete user details from the database
        this.loadUsers(); // Reload users after deletion
      }
    });
  }

  canShowActions(user: Profile): boolean {
    // Add logic to check user's role or role_club
    if (
      this.currentUser.role === 'admin' ||
      user.role_club === 'President' ||
      user.role_club === 'Vice-President'
    ) {
      return true;
    }
    return false;
  }
}
