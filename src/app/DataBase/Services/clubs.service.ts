import { Injectable } from '@angular/core';
import { SupabaseClient, createClient } from '@supabase/supabase-js';
import { supabaseEnvironment } from 'src/environments/environment';

import { Club } from '../Models/club';

@Injectable({
  providedIn: 'root',
})
export class ClubsService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(
      supabaseEnvironment.supabaseUrl,
      supabaseEnvironment.supabaseKey
    );
  }

  async getClubs(): Promise<Club[]> {
    const { data, error } = await this.supabase.from('Clubs').select('*');
    if (error) {
      throw error;
    }
    return data;
  }

  async getClubById(id: string) : Promise<Club[]> {
    const { data, error } = await this.supabase.from('Clubs').select('*').eq('id', id);
    if (error) {
      throw error;
    }
    return data;
  }

  async updateClubById(id: string, club: Club) : Promise<Club[]> {
    const { data, error } = await this.supabase.from('Clubs').update(club).eq('id', id);
    if (error) {
      throw error;
    }
    return data? data : [];
  }

  async deleteClubById(id: string) : Promise<Club[]> {
    const { data, error } = await this.supabase.from('Clubs').delete().eq('id', id);
    if (error) {
      throw error;
    }
    return data? data : [];
  }
}
