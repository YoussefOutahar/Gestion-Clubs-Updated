import { Component, OnInit } from '@angular/core';

import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
})
export class AuthPageComponent implements OnInit {
  loginForm: FormGroup;
  returnUrl: string = '';

  constructor(
    private authService: AuthService,
    private spinner: NgxSpinnerService,
    private router: Router
  ) {
    this.loginForm = new FormGroup({
      email: new FormControl('youssefoutahar1@gmail.com', [
        Validators.required,
        Validators.email,
      ]),
      password: new FormControl('testtest', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(20),
      ]),
    });
  }

  ngOnInit(): void {
    this.returnUrl = '/dashboard';
    this.authService.logout();
  }

  async onFormSubmit() {
    console.log('Submiting login form');

    if (this.loginForm.invalid) {
      console.log('Invalid form');

      // console log all errors
      Object.keys(this.loginForm.controls).forEach((key) => {
        const controlErrors = this.loginForm.get(key)?.errors;
        if (controlErrors != null) {
          Object.keys(controlErrors).forEach((keyError) => {
            console.log(
              'Key control: ' +
                key +
                ', keyError: ' +
                keyError +
                ', err value: ',
              controlErrors[keyError]
            );
          });
        }
      });
      return;
    }

    this.spinner.show();

    const email = this.loginForm.get('email')?.value;
    const password = this.loginForm.get('password')?.value;

    const result = await this.authService.login(email, password);

    this.spinner.hide();

    if (result) {
      this.router.navigate([this.returnUrl]);
    } else {
      console.log('Login failed');
    }
  }
}
