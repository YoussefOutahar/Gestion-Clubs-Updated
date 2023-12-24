import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Category, Club } from '../../../../DataBase/Models/club';
import { ClubsService } from '../../../../DataBase/Services/clubs.service';
import { ProfilesService } from '../../../../DataBase/Services/profiles.service';
import { UploadsService } from '../../../../DataBase/Services/uploads.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-clubCreation',
  templateUrl: './clubCreation.component.html',
  styleUrls: ['./clubCreation.component.css'],
})
export class ClubCreationComponent implements OnInit {
  clubFormGroup = this._formBuilder.group({
    name: ['', [Validators.required,]],
    mission: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20),]],
    kpo: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20),]],
    type: ['Academic', [Validators.required]],
    category: ['', [Validators.required]],
    logo: [null, [Validators.required]],
  });

  supervisorFormGroup = this._formBuilder.group({
    name: ['', [ Validators.required, Validators.minLength(6), Validators.maxLength(20),]],
    phone: [{ value: '', disabled: this.clubFormGroup.value.type === 'Non-Academic' }, [Validators.required,]],
    email: [{ value: '', disabled: this.clubFormGroup.value.type === 'Non-Academic' }, [Validators.required,]],
  });

  presidentFormGroup = this._formBuilder.group({
    name: ['', [ Validators.required, Validators.minLength(6), Validators.maxLength(20),]],
    field: ['', [Validators.required,]],
    year: ['', [Validators.required,]],
    phone: ['', [Validators.required,]],
    email: ['', [Validators.required,]],
  });
  vicePresidentFormGroup = this._formBuilder.group({
    name: ['', [ Validators.required, Validators.minLength(6), Validators.maxLength(20),]],
    field: ['', [Validators.required,]],
    year: ['', [Validators.required,]],
    phone: ['', [Validators.required,]],
    email: ['', [Validators.required,]],
  });

  secretaryFormGroup = this._formBuilder.group({
    name: ['', [ Validators.required, Validators.minLength(6), Validators.maxLength(20),]],
    field: ['', [Validators.required,]],
    year: ['', [Validators.required,]],
    phone: ['', [Validators.required,]],
    email: ['', [Validators.required,]],
  });

  financierFormGroup = this._formBuilder.group({
    name: ['', [ Validators.required, Validators.minLength(6), Validators.maxLength(20),]],
    field: ['', [Validators.required,]],
    year: ['', [Validators.required,]],
    phone: ['', [Validators.required,]],
    email: ['', [Validators.required,]],
  });


  constructor(
    private _formBuilder: FormBuilder,
    private clubsService: ClubsService,
    private profilesService: ProfilesService,
    private uploadService: UploadsService,
    private router: Router
  ) { }

  categories: Category[] = [];
  categoryNames: string[] = [];

  createdClub: Club | null = null;

  ngOnInit() {
    this.getAllAvailableCategories();

    // Add a listener to the 'type' FormControl
    this.clubFormGroup.get('type')?.valueChanges.subscribe((type) => {
      const supervisorControls = ['name', 'phone', 'email'].map(controlName => this.supervisorFormGroup.get(controlName));
      if (supervisorControls) {
        supervisorControls.forEach(control => {
          if (control) {
            if (type === 'Non-Academic') {
              control.disable();
            } else {
              control.enable();
            }
          }
        });
      }
    });
  }

  async getAllAvailableCategories() {
    this.categories = await this.clubsService.getClubCategories();

    this.categories.forEach((category) => {
      this.categoryNames.push(category.category_name);
    });
  }

  onFileChange(event: any) {
    const fileInput = event.target;

    if (fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files[0];
      const fileControl = this.clubFormGroup.get('logo');

      // Update the form control with the selected file
      this.clubFormGroup.patchValue({
        logo: file,
      });

      // Trigger change detection to update the view
      if (fileControl) {
        fileControl.updateValueAndValidity();
      }
    }
  }

  async saveClub() {
    const logoControl = this.clubFormGroup.get('logo');

    if (logoControl && logoControl.value) {
      const file: File = logoControl.value;
      console.log('File name:', file.name);

      try {
        // Upload the file and get the URL
        await this.uploadService.uploadClubLogo(file);

        // Assuming you have a method in clubsService to handle file upload
        const FileUrl =
          'https://vussefkqdtgdosoytjch.supabase.co/storage/v1/object/public/Clubs_Logo/' +
          file.name;

        // Update the event with the new values
        const newClub = {
          name: this.clubFormGroup.value.name!,
          date_creation: new Date().toISOString(),
          kpo: this.clubFormGroup.value.kpo!,
          mission: this.clubFormGroup.value.mission!,
          type: this.clubFormGroup.value.type!,
          logo: FileUrl,
          nb_member: 4,
          id_category: this.categories.find(
            (category) =>
              category.category_name === this.clubFormGroup.value.category!,
          )?.id!,
          state: 'pending',
        };

        await this.clubsService.addClub(newClub);

        // Update successful, do any additional logic if needed
      } catch (error) {
        console.error('Error creating club:', error);
        // Handle the error as needed
      } finally {
        this.router.navigate(['/landingPage']);
      }
    } else {
      // Handle the case where no file is selected
      console.error('Please select a file.');
    }
  }

  async saveSupervisor() {
    // Only save supervisor data if the controls are not disabled
    if (!this.supervisorFormGroup.get('name')?.disabled) {
      this.profilesService.addProfile({
        name: this.supervisorFormGroup.get('name')?.value!,
        field: '',
        year: '',
        phone: this.supervisorFormGroup.get('phone')?.value!,
        email: this.supervisorFormGroup.get('email')?.value!,
        id_club: this.createdClub?.id!,
        role_club: 'Supervisor',
        state: 'pending',
      });
    }
  }

  savePresident() {
    this.profilesService.addProfile({
      name: this.presidentFormGroup.get('name')?.value!,
      field: this.presidentFormGroup.get('field')?.value!,
      year: this.presidentFormGroup.get('year')?.value!,
      phone: this.presidentFormGroup.get('phone')?.value!,
      email: this.presidentFormGroup.get('email')?.value!,
      id_club: this.createdClub?.id!,
      role_club: 'President',
      state: 'pending',
    });
  }

  saveVicePresident() {
    console.log(this.vicePresidentFormGroup.value);
    this.profilesService.addProfile({
      name: this.vicePresidentFormGroup.get('name')?.value!,
      field: this.vicePresidentFormGroup.get('field')?.value!,
      year: this.vicePresidentFormGroup.get('year')?.value!,
      phone: this.vicePresidentFormGroup.get('phone')?.value!,
      email: this.vicePresidentFormGroup.get('email')?.value!,
      id_club: this.createdClub?.id!,
      role_club: 'VicePresident',
      state: 'pending',
    });
  }

  saveSecretary() {
    console.log(this.secretaryFormGroup.value);
    this.profilesService.addProfile({
      name: this.secretaryFormGroup.get('name')?.value!,
      field: this.secretaryFormGroup.get('field')?.value!,
      year: this.secretaryFormGroup.get('year')?.value!,
      phone: this.secretaryFormGroup.get('phone')?.value!,
      email: this.secretaryFormGroup.get('email')?.value!,
      id_club: this.createdClub?.id!,
      role_club: 'Secretary',
      state: 'pending',
    });
  }

  saveFinancier() {
    console.log(this.financierFormGroup.value);
    this.profilesService.addProfile({
      name: this.financierFormGroup.get('name')?.value!,
      field: this.financierFormGroup.get('field')?.value!,
      year: this.financierFormGroup.get('year')?.value!,
      phone: this.financierFormGroup.get('phone')?.value!,
      email: this.financierFormGroup.get('email')?.value!,
      id_club: this.createdClub?.id!,
      role_club: 'Accountant',
      state: 'pending',
    });
  }
  
  async onSubmit() {
    this.saveClub();
    this.saveSupervisor();
    this.savePresident();
    this.saveVicePresident();
    this.saveFinancier();
    this.saveSecretary();
  }
}
