import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';
import { Observable, filter, map, take } from 'rxjs';

export const authGuard: CanActivateFn = (
  route,
  state
): Observable<UrlTree | boolean> => {
  return inject(AuthService)
    .currentUser.pipe()
    .pipe(
      filter((val) => val !== null), // Filter out initial Behavior subject value
      take(1), // Otherwise the Observable doesn't complete!
      map((isAuthenticated) => {
        if (isAuthenticated) {
          return true;
        } else {
          return inject(Router).createUrlTree(['/session/authenticate']);
        }
      })
    );
};
