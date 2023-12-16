import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { Category, Club } from '../../../DataBase/Models/club';
import { ClubsService } from '../../../DataBase/Services/clubs.service';
import { ProfilesService } from '../../../DataBase/Services/profiles.service';

@Component({
  selector: 'app-clubCreation',
  templateUrl: './clubCreation.component.html',
  styleUrls: ['./clubCreation.component.css'],
})
export class ClubCreationComponent implements OnInit {
  clubFormGroup = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(20),
    ]),
    mission: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(20),
    ]),
    kpo: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(20),
    ]),
    type: new FormControl('Academic', [Validators.required]),
    category: new FormControl('', [Validators.required]),
    logo: new FormControl(null, [Validators.required]),
  });
  supervisorFormGroup = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(20),
    ]),
    field: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(20),
    ]),
    year: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(20),
    ]),
    phone: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(20),
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(20),
    ]),
  });
  presidentFormGroup = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(20),
    ]),
    field: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(20),
    ]),
    year: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(20),
    ]),
    phone: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(20),
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(20),
    ]),
  });
  vicePresidentFormGroup = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(20),
    ]),
    field: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(20),
    ]),
    year: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(20),
    ]),
    phone: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(20),
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(20),
    ]),
  });
  secretaryFormGroup = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(20),
    ]),
    field: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(20),
    ]),
    year: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(20),
    ]),
    phone: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(20),
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(20),
    ]),
  });
  financierFormGroup = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(20),
    ]),
    field: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(20),
    ]),
    year: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(20),
    ]),
    phone: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(20),
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(20),
    ]),
  });

  constructor(
    private clubsService: ClubsService,
    private profilesService: ProfilesService
  ) {}

  categories: Category[] = [];
  categoryNames: string[] = [];

  createdClub: Club | null = null;

  ngOnInit() {
    this.getAllAvailableCategories();
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
    this.createdClub = await this.clubsService.addClub({
      name: this.clubFormGroup.get('name')?.value!,
      date_creation: new Date().toISOString(),
      kpo: this.clubFormGroup.get('kpo')?.value!,
      mission: this.clubFormGroup.get('mission')?.value!,
      type: this.clubFormGroup.get('type')?.value!,
      logo: '',
      nb_member: 4,
      id_category: this.categories.find(
        (category) =>
          category.category_name === this.clubFormGroup.get('category')?.value
      )?.id!,
      state: 'pending',
    });
  }
  saveSupervisor() {
    this.profilesService.addProfile({
      name: this.supervisorFormGroup.get('name')?.value!,
      field: this.supervisorFormGroup.get('field')?.value!,
      year: this.supervisorFormGroup.get('year')?.value!,
      phone: this.supervisorFormGroup.get('phone')?.value!,
      email: this.supervisorFormGroup.get('email')?.value!,
      id_club: this.createdClub?.id!,
      role_club: 'Supervisor',
      state: 'pending',
    });
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
      role_club: 'Financier',
      state: 'pending',
    });
  }
}
