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
      const formData = this.form.value;

      // Create an array of promises for all budgets
      const budgetPromises = this.clubs.map(async (club) => {

        const currentRest = await this.clubsService.getRestBudgetByClub(club.id);

        const budgetData = {
          id_club: club.id,
          source: 'DVE',
          budget: formData[club.id],
          rest: currentRest,
          year: this.date.getFullYear(),
        };

        // Return the promise for addBudget
        return this.clubsService.addBudget(budgetData);
      });

      // Wait for all budgets to be added before redirecting
      Promise.all(budgetPromises)
        .then(() => {
          // Reset the form after adding budgets
          this.form.reset();

          // Redirect to the desired route after submitting the form
          this.router.navigate(['/dashboard/finance']);
        })
        .catch((error) => {
          console.error('Error adding budgets', error);
          // Handle errors if needed
        });
    }
  }
}
