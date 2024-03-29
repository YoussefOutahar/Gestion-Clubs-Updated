import { Injectable } from '@angular/core';

import { SupabaseClient, createClient } from '@supabase/supabase-js';
import { supabaseEnvironment } from '../../../environments/environment';

import { Profile, PendingProfile } from '../Models/profile';
import { TableNames } from '../../Config/constants';

import { AuthService } from '../../Auth/auth.service';

import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';

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

  async getPendingProfiles(): Promise<PendingProfile[]> {
    const { data, error } = await this.supabase
      .from(TableNames.PendingProfiles)
      .select('*');
    if (error) {
      throw error;
    }
    return data;
  }

  async getPendingMembers(id: string): Promise<PendingProfile[]> {
    try {
      const { data, error } = await this.supabase
        .from(TableNames.PendingProfiles)
        .select('*')
        .eq('role_club', 'Member')
        .eq('id_club', id);
  
      if (error) {
        throw new Error(`Error fetching pending members: ${error.message}`);
      }
  
      return data || [];
    } catch (error) {
      // Handle unexpected errors, log, or rethrow as needed
      console.error('An error occurred while fetching pending members:', error);
      throw error;
    }
  }
  

  async validatePendingProfile(profile: PendingProfile) {
    const password = Math.random().toString(36).slice(-8);

    console.log(profile);

    const { data, error } = await this.supabase.auth.admin.createUser({
      email: profile.email,
      password: password,
      user_metadata: {
        email: profile.email,
        role: 'user',
        avatar: '',
        name: profile.name,
        phone: profile.phone,
        field: profile.field,
        year: profile.year,
        role_club: profile.role_club,
        id_club: profile.id_club.toString(),
      },
      email_confirm: true,
    });
    if (error) {
      throw error;
    }

    emailjs.init('mwiq7Y19VrWl3ZI4K');

    const emailTemplateParams = {
      to_name: profile.name,
      to_email: profile.email,
      subject: 'Your account has been created',
      message: `Your account has been created succesfully !!, your password is ${password}`,
    };

    emailjs
      .send('service_bwaniep', 'template_x1tvi3j', emailTemplateParams)
      .then(
        (result: EmailJSResponseStatus) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
          throw error;
        }
      );

    const { data: data2, error: error2 } = await this.supabase
      .from(TableNames.PendingProfiles)
      .update({ state: 'accepted' })
      .eq('id', profile.id);
    if (error2) {
      throw error2;
    }
  }

  async getClubPendingProfiles(id: number): Promise<PendingProfile[]> {
    const { data, error } = await this.supabase
      .from(TableNames.PendingProfiles)
      .select('*')
      .eq('id_club', id);
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

  //TO-DO validate Pending Profiles and create accounts for them

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

  async deletePendingProfile(profile: PendingProfile): Promise<PendingProfile[]> {
    const { data, error } = await this.supabase
      .from(TableNames.PendingProfiles)
      .delete()
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

  async getProfileByClub(id: string): Promise<Profile[]> {
    const { data, error } = await this.supabase
      .from(TableNames.Profiles)
      .select('*')
      .eq('id_club', id);
    if (error) {
      throw error;
    }
    return data;
  }

  async updateProfileAvatar(id: string, avatar: string): Promise<Profile[]> {
    const { data, error } = await this.supabase
        .from(TableNames.Profiles)
        .update({ avatar })
        .eq('id', id);
    if (error) {
        throw error;
    }
    return data ? data : [];
}
}
