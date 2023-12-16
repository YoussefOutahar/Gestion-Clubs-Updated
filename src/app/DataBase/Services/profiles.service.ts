import { Injectable } from '@angular/core';

import { SupabaseClient, createClient } from '@supabase/supabase-js';
import { supabaseEnvironment } from '../../../environments/environment';

import { Profile, PendingProfile } from '../Models/profile';
import { TableNames } from '../../Config/constants';

import { AuthService } from '../../Auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class ProfilesService {
  private supabase: SupabaseClient;

  constructor(private AuthService: AuthService) {
    this.supabase = createClient(
      supabaseEnvironment.supabaseUrl,
      supabaseEnvironment.supabaseKey
    );
  }

  async getProfiles(): Promise<Profile[]> {
    const { data, error } = await this.supabase
      .from(TableNames.Profiles)
      .select('*');
    if (error) {
      throw error;
    }
    return data;
  }

  async getProfileById(id: string): Promise<Profile[]> {
    const { data, error } = await this.supabase
      .from(TableNames.Profiles)
      .select('*')
      .eq('id', id);
    if (error) {
      throw error;
    }
    return data;
  }

  async addProfile(profile: PendingProfile) {
    const { error } = await this.supabase
      .from(TableNames.PendingProfiles)
      .insert(profile);
    if (error) {
      throw error;
    }
  }

  async updateProfile(profile: Profile): Promise<Profile[]> {
    const { data, error } = await this.supabase
      .from(TableNames.Profiles)
      .update(profile)
      .eq('id', profile.id);
    if (error) {
      throw error;
    }
    return data ? data : [];
  }

  async deleteProfile(profile: Profile): Promise<Profile[]> {
    const { data, error } = await this.supabase
      .from(TableNames.Profiles)
      .delete()
      .eq('id', profile.id);
    if (error) {
      throw error;
    }
    return data ? data : [];
  }

  async getProfileRole(id: string): Promise<string> {
    const { data, error } = await this.supabase
      .from(TableNames.Profiles)
      .select('role_club')
      .eq('id', id);
    if (error) {
      throw error;
    }
    return data[0].role_club;
  }
}
