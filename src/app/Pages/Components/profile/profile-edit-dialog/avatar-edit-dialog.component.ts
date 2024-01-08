// avatar-edit-dialog.component.ts

import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UploadsService } from '../../../../DataBase/Services/uploads.service';
import { Profile } from '../../../../DataBase/Models/profile';
import { ProfilesService } from '../../../../DataBase/Services/profiles.service';

@Component({
    selector: 'app-avatar-edit-dialog',
    templateUrl: './avatar-edit-dialog.component.html',
    styleUrls: ['./avatar-edit-dialog.component.css']
})
export class AvatarEditDialogComponent {
    selectedFile: File | null = null;
    selectedFileUrl: any;

    constructor(
        public dialogRef: MatDialogRef<AvatarEditDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: Profile,
        private uploadService: UploadsService,
        private profileService: ProfilesService,
    ) { }

    onFileSelected(event: any) {
        const file: File = event.target.files[0];
        this.selectedFile = file;

        // Display a preview of the selected image
        const reader = new FileReader();
        reader.onload = (e) => {
            this.selectedFileUrl = e.target?.result;
        };
        reader.readAsDataURL(file);
    }

    async saveAvatar() {
        if (this.selectedFile) {
            try {
                // Upload the avatar file and get the URL
                await this.uploadService.uploadAvatar(this.selectedFile);
                const avatarUrl = 'https://vussefkqdtgdosoytjch.supabase.co/storage/v1/object/public/Avatars/' +
                    this.selectedFile.name;
                console.log("user Data : " ,this.data);

                console.log("uavatar url  : " ,avatarUrl);
                const userId = this.data.id;

                if (userId) {
                    // Update only the avatar field in the profile
                    await this.profileService.updateProfileAvatar(userId, avatarUrl);
    
                    // Close the dialog after successful upload
                    this.dialogRef.close();
                } else {
                    console.error('Invalid user ID.');
                }
            } catch (error) {
                console.error('Error uploading avatar:', error);
            }
        } else {
            console.error('Please select an avatar file.');
        }
    }

    cancel() {
        this.dialogRef.close();
    }
}
