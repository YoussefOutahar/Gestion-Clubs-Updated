import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  var isLoggedIn = false;

  inject(AuthService)
    .currentUser.asObservable()
    .subscribe((user) => {
      console.log(user);
      isLoggedIn = !!user;
    });

  console.log(isLoggedIn);

  if (!isLoggedIn) {
    inject(Router).navigate(['/session/authenticate']);
  }

  return isLoggedIn;
};
