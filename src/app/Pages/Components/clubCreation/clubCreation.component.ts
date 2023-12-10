import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ClubsService } from 'src/app/DataBase/Services/clubs.service';

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

  constructor(private clubsService: ClubsService) {}

  categoryNames: string[] = [];

  ngOnInit() {
    this.getAllAvailableCategories();
  }

  async getAllAvailableCategories() {
    const clubCategories = await this.clubsService.getClubCategories();

    clubCategories.forEach((category) => {
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

  saveClub() {
    console.log(this.clubFormGroup.value);
    this.clubsService.addClub({
      id: null,
      name: this.clubFormGroup.get('name')?.value!,
      date_creation: new Date().toISOString(),
      kpo: this.clubFormGroup.get('kpo')?.value!,
      mission: this.clubFormGroup.get('mission')?.value!,
      type: this.clubFormGroup.get('type')?.value!,
      logo: this.clubFormGroup.get('logo')?.value!,
      nb_member: 4,
      id_category: 0,
      state: 'Pending',
    });
  }
  saveSupervisor() {
    console.log(this.supervisorFormGroup.value);
  }
  savePresident() {
    console.log(this.presidentFormGroup.value);
  }
  saveVicePresident() {
    console.log(this.vicePresidentFormGroup.value);
  }
  saveSecretary() {
    console.log(this.secretaryFormGroup.value);
  }
  saveFinancier() {
    console.log(this.financierFormGroup.value);
  }
}
