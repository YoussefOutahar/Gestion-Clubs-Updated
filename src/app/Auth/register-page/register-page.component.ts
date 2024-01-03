import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
})
export class RegisterPageComponent implements OnInit {
  constructor(
    private router: Router,
    private authService: AuthService,
    private spinner: NgxSpinnerService
  ) {}

  form = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required]),
    field: new FormControl('', [Validators.required]),
    year: new FormControl('', [Validators.required]),
  });

  async submit() {
    this.spinner.show();
    const result = await this.authService.register(
      this.form.value.username!,
      this.form.value.email!,
      this.form.value.password!,
      this.form.value.phone!,
      this.form.value.field!,
      this.form.value.year!
    );

    this.spinner.hide();

    if (result) {
      this.router.navigate(['/dashboard/home']);
    } else {
      console.log('Login failed');
    }
  }

  ngOnInit() {}
}
