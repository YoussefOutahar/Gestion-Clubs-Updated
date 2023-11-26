// assign-budget.component.ts

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClubsService } from 'src/app/DataBase/Services/clubs.service';

@Component({
  selector: 'app-assign-budget',
  templateUrl: './assignBudget.component.html',
  styleUrls: ['./assignBudget.component.css'],
})
export class AssignBudgetComponent implements OnInit {
  date = new Date();
  clubs: any[] = [];
  form!: FormGroup;

  constructor(private router: Router, private clubsService: ClubsService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.getActiveClubs();
  }

  getActiveClubs() {
    this.clubsService.getActiveClubs().then((clubs) => {
      this.clubs = clubs;

      // Initialize the form with form controls for each club
      const formControls: any = {};
      this.clubs.forEach((club) => {
        formControls[club.id] = this.fb.control('', Validators.required);
      });

      this.form = this.fb.group(formControls);
    });
  }

  handleSubmit(): void {
    if (this.form.valid) {
      // Perform actions with the form data, for example, sending it to the server
      const formData = this.form.value;
      console.log(formData);

      // Add your logic here to send the form data to the server or perform other actions
      // Example: this.clubsService.assignBudgets(formData).then(() => {});

      // Reset the form if needed
      this.form.reset();
    }
  }
}
