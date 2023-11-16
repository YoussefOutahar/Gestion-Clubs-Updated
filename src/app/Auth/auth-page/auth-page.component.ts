import { Component, OnInit } from '@angular/core';

import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
})
export class AuthPageComponent implements OnInit {

  loginForm: FormGroup; 
  returnUrl: string = "";  
  
  constructor(
    private authService: AuthService,
    private router: Router,
  ) { 
    this.loginForm = new FormGroup({
      email: new FormControl('example@email.com', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]),
    });
   }


  onFormSubmit(): void {
    console.log('Submiting login form');

    if (this.loginForm.invalid) {
      console.log('Invalid form');

      // console log all errors
      Object.keys(this.loginForm.controls).forEach((key) => {
        const controlErrors = this.loginForm.get(key)?.errors;
        if (controlErrors != null) {
          Object.keys(controlErrors).forEach((keyError) => {
            console.log(
              'Key control: ' + key + ', keyError: ' + keyError + ', err value: ',
              controlErrors[keyError]
            );
          });
        }
      });
      return;
    }

    this.authService.login(this.loginForm.get('email')?.value!, this.loginForm.get('password')?.value!);
    // const data: Ilogin = {
    //   email: this.loginForm.get('email')?.value,
    //   password: this.loginForm.get('password')?.value,
    // };
  }


  ngOnInit(): void {
    this.returnUrl = '/dashboard';
    this.authService.logout();
  }



}
