// profile.component.ts
import { Component, OnInit } from '@angular/core';
import { User } from '@supabase/supabase-js';
import { AuthService } from '../../../Auth/auth.service';
import { ProfilesService } from '../../../DataBase/Services/profiles.service';
import { MatDialog } from '@angular/material/dialog';
import { AvatarEditDialogComponent } from './profile-edit-dialog/avatar-edit-dialog.component';


@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
    currentUser: boolean | User | any;


    // Add properties and methods as needed

    constructor(
        private authService: AuthService,
        private profilesService: ProfilesService,
        public dialog: MatDialog
    ) { }

    ngOnInit(): void {
        // Get the current user data
        const user = this.authService.currentUser.value;
        this.profilesService.getProfileById(user.id)
            .then((profile) => {
                this.currentUser = profile[0]; // Assuming getProfileById returns an array
                console.log('user : ', this.currentUser);
            })
            .catch((error) => {
                console.error('Error fetching user profile:', error);
            });
    }

    editAvatar(): void {
        // Open a dialog or navigate to another component for avatar editing
        const dialogRef = this.dialog.open(AvatarEditDialogComponent, {
            width: '300px', 
            height: '400px', 
            data: this.currentUser , 
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
            // Handle the result if needed
        });
    }

}
