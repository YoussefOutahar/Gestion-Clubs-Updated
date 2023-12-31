import { Injectable } from '@angular/core';
import { Router, UrlTree } from '@angular/router';

import { BehaviorSubject, Observable, filter, map, take } from 'rxjs';

import {
  AuthChangeEvent,
  Session,
  SupabaseClient,
  User,
  createClient,
} from '@supabase/supabase-js';
import { supabaseEnvironment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private supabase: SupabaseClient;
  private _currentUser: BehaviorSubject<boolean | User | any> =
    new BehaviorSubject(null);

  constructor(private router: Router) {
    this.supabase = createClient(
      supabaseEnvironment.supabaseUrl,
      supabaseEnvironment.supabaseKey
    );

    const user = this.supabase.auth.getUser().then((user) => {
      if (user) {
        this._currentUser.next(user);
      } else {
        this._currentUser.next(false);
      }
    });

    this.supabase.auth.onAuthStateChange((event, session) => {
      console.log(event, session);

      if (event === 'SIGNED_IN') {
        this._currentUser.next(session?.user);
      } else {
        this._currentUser.next(false);
      }
    });
  }

  authChanges(
    callback: (event: AuthChangeEvent, session: Session | null) => void
  ) {
    return this.supabase.auth.onAuthStateChange(callback);
  }

  login(email: string, password: string) {
    return this.supabase.auth.signInWithPassword({ email, password });
  }

  register(
    name: string,
    email: string,
    password: string,
    phone: string,
    field: string,
    year: string
  ) {
    this.supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          role: 'user',
          name: name,
          email: email,
          avatar: '',
          phone: phone,
          year: year,
          role_club: 'Member',
          field: field,
        },
      },
    });

    return this.login(email, password);
  }

  signInWithEmail(email: string) {
    return this.supabase.auth.signInWithOtp({
      email,
    });
  }

  logout() {
    return this.supabase.auth.signOut();
  }

  get currentUser() {
    return this._currentUser;
  }
}
