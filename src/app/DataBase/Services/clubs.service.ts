import { Injectable } from '@angular/core';
import { SupabaseClient, createClient } from '@supabase/supabase-js';
import { supabaseEnvironment } from 'src/environments/environment';

import { Club, Category, Event, Meeting, Forum, ForumMessage } from '../Models/club';
import { TableNames } from 'src/app/Config/constants';

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

  // ============== Clubs ============== //

  async getClubs(): Promise<Club[]> {
    const { data, error } = await this.supabase.from(TableNames.Clubs).select('*');
    if (error) {
      throw error;
    }
    return data;
  }

  async getClubById(id: string) : Promise<Club[]> {
    const { data, error } = await this.supabase.from(TableNames.Clubs).select('*').eq('id', id);
    if (error) {
      throw error;
    }
    return data;
  }

  async updateClubById(id: string, club: Club) : Promise<Club[]> {
    const { data, error } = await this.supabase.from(TableNames.Clubs).update(club).eq('id', id);
    if (error) {
      throw error;
    }
    return data? data : [];
  }

  async deleteClubById(id: string) : Promise<Club[]> {
    const { data, error } = await this.supabase.from(TableNames.Clubs).delete().eq('id', id);
    if (error) {
      throw error;
    }
    return data? data : [];
  }

  
  // ============== Category ============== //

  async getClubCategory(club: Club): Promise<Category> {
    const { data, error } = await this.supabase
      .from(TableNames.Category)
      .select('*')
      .eq('id', club.id_category);
    if (error) {
      throw error;
    }
    return data[0];
  }

  async getClubCategories(clubs: Club[]): Promise<Category[]> {
    const { data, error } = await this.supabase.from(TableNames.Category).select('*');
    if (error) {
      throw error;
    }
    return data;
  }

  // ============== Events ============== //
  async getEvents(): Promise<Event[]> {
    const { data, error } = await this.supabase.from(TableNames.Events).select('*');
    if (error) {
      throw error;
    }
    return data;
  }

  async getClubEvents(club: Club): Promise<Event[]> {
    const { data, error } = await this.supabase
      .from(TableNames.Events)
      .select('*')
      .eq('id_club', club.id);
    if (error) {
      throw error;
    }
    return data;
  }

  async getEventById(id: number): Promise<Event[]> {
    const { data, error } = await this.supabase.from(TableNames.Events).select('*').eq('id', id);
    if (error) {
      throw error;
    }
    return data;
  }

  
  // ============== Meetings ============== //

  async getClubMeetings(club: Club): Promise<Meeting[]> {
    const { data, error } = await this.supabase
      .from(TableNames.Meetings)
      .select('*')
      .eq('id_club', club.id);
    if (error) {
      throw error;
    }
    return data;
  }

  async getMeetings(): Promise<Meeting[]> {
    const { data, error } = await this.supabase.from(TableNames.Meetings).select('*');
    if (error) {
      throw error;
    }
    return data;
  }

  async getMeetingById(id: number): Promise<Meeting[]> {
    const { data, error } = await this.supabase.from(TableNames.Meetings).select('*').eq('id', id);
    if (error) {
      throw error;
    }
    return data;
  }

  
  // ============== Forums ============== //
  async getForums(): Promise<Forum[]> {
    const { data, error } = await this.supabase.from(TableNames.Forums).select('*');
    if (error) {
      throw error;
    }
    return data;
  }

  async getForumById(id: number): Promise<Forum[]> {
    const { data, error } = await this.supabase.from(TableNames.Forums).select('*').eq('id', id);
    if (error) {
      throw error;
    }
    return data;
  }

  async getClubForums(club: Club): Promise<Forum[]> {
    const { data, error } = await this.supabase
      .from(TableNames.Forums)
      .select('*')
      .eq('club_id', club.id);
    if (error) {
      throw error;
    }
    return data;
  }

  
  // ============== Messages ============== //
  async getMessages(): Promise<ForumMessage[]> {
    const { data, error } = await this.supabase.from(TableNames.Messages).select('*');
    if (error) {
      throw error;
    }
    return data;
  }

  async getForumMessages(forum: Forum): Promise<ForumMessage[]> {
    const { data, error } = await this.supabase
      .from(TableNames.Messages)
      .select('*')
      .eq('forum_id', forum.id);
    if (error) {
      throw error;
    }
    return data;
  }

  async getForumMessageById(id: number): Promise<ForumMessage[]> {
    const { data, error } = await this.supabase.from(TableNames.Messages).select('*').eq('id', id);
    if (error) {
      throw error;
    }
    return data;
  }
}
