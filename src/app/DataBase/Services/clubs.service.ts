import { Injectable } from '@angular/core';
import { SupabaseClient, createClient } from '@supabase/supabase-js';
import { supabaseEnvironment } from 'src/environments/environment';

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

  async getClubs() {
    return this.supabase.from('clubs').select('*');
  }

  async getClubById(id: string) {
    return this.supabase.from('clubs').select('*').eq('id', id);
  }

  async updateClubById(id: string, club: any) {
    return this.supabase.from('clubs').update(club).eq('id', id);
  }
}
