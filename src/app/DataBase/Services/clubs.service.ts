import { Injectable } from '@angular/core';
import { SupabaseClient, createClient } from '@supabase/supabase-js';
import { supabaseEnvironment } from '../../../environments/environment';

import {
  Club,
  Category,
  Event,
  NewEvent,
  Meeting,
  Forum,
  ForumMessage,
  Budget,
  UpdatedEvent,
  Document,
  NewDocument,
} from '../Models/club';
import { TableNames } from '../..//Config/constants';

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
    const { data, error } = await this.supabase
      .from(TableNames.Clubs)
      .select('*');
    if (error) {
      throw error;
    }
    return data;
  }

  async addClub(club: Club): Promise<Club | null> {
    const { data, error } = await this.supabase
      .from(TableNames.Clubs)
      .insert([club]);
    if (error) {
      throw error;
    }
    return data ? data[0] : null;
  }

  async getActiveClubs(): Promise<Club[]> {
    const { data, error } = await this.supabase
      .from(TableNames.Clubs)
      .select('*')
      .eq('state', 'active');
    if (error) {
      throw error;
    }
    return data;
  }

  async getPendingClubs(): Promise<Club[]> {
    const { data, error } = await this.supabase
      .from(TableNames.Clubs)
      .select('*')
      .eq('state', 'pending');
    if (error) {
      throw error;
    }
    return data;
  }

  async getClubById(id: string): Promise<Club[]> {
    const { data, error } = await this.supabase
      .from(TableNames.Clubs)
      .select('*')
      .eq('id', id);
    if (error) {
      throw error;
    }
    return data;
  }

  async updateClubById(id: string, club: Club): Promise<Club[]> {
    const { data, error } = await this.supabase
      .from(TableNames.Clubs)
      .update(club)
      .eq('id', id);
    if (error) {
      throw error;
    }
    return data ? data : [];
  }

  async deleteClubById(id: number): Promise<Club[]> {
    const { data, error } = await this.supabase
      .from(TableNames.Clubs)
      .delete()
      .eq('id', id);
    if (error) {
      throw error;
    }
    return data ? data : [];
  }

  async validateClubByDve(club: Club): Promise<Club[]> {
    const updatedClub: Club = { ...club, state: 'active' };
    const { data, error } = await this.supabase
      .from(TableNames.Clubs)
      .update(updatedClub)
      .eq('id', club.id);
    if (error) {
      throw error;
    }
    return data ? data : [];
  }

  async validateClubByRef(club: Club): Promise<Club[]> {
    const updatedClub: Club = { ...club, state: 'waiting dve validation' };
    const { data, error } = await this.supabase
      .from(TableNames.Clubs)
      .update(updatedClub)
      .eq('id', club.id);
    if (error) {
      throw error;
    }
    return data ? data : [];
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

  async getClubCategories(): Promise<Category[]> {
    const { data, error } = await this.supabase
      .from(TableNames.Category)
      .select('*');
    if (error) {
      throw error;
    }
    return data;
  }

  // ============== Meetings ============== //

  async getClubMeetings(id: Number): Promise<Meeting[]> {
    const { data, error } = await this.supabase
      .from(TableNames.Meetings)
      .select('*')
      .eq('id_club', id);
    if (error) {
      throw error;
    }
    return data;
  }

  async getMeetings(): Promise<Meeting[]> {
    const { data, error } = await this.supabase
      .from(TableNames.Meetings)
      .select('*');
    if (error) {
      throw error;
    }
    return data;
  }

  async getMeetingById(id: number): Promise<Meeting[]> {
    const { data, error } = await this.supabase
      .from(TableNames.Meetings)
      .select('*')
      .eq('id', id);
    if (error) {
      throw error;
    }
    return data;
  }

  async addMeeting(meeting: Meeting): Promise<void> {
    const { data, error } = await this.supabase
      .from(TableNames.Meetings)
      .insert([meeting]);
    if (error) {
      throw error;
    }
  }

  // ============== Forums ============== //
  async getForums(): Promise<Forum[]> {
    const { data, error } = await this.supabase
      .from(TableNames.Forums)
      .select('*');
    if (error) {
      throw error;
    }
    return data;
  }

  async getForumById(id: number): Promise<Forum[]> {
    const { data, error } = await this.supabase
      .from(TableNames.Forums)
      .select('*')
      .eq('id', id);
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
    const { data, error } = await this.supabase
      .from(TableNames.Messages)
      .select('*');
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
    const { data, error } = await this.supabase
      .from(TableNames.Messages)
      .select('*')
      .eq('id', id);
    if (error) {
      throw error;
    }
    return data;
  }

  // ============== Events ============== //

  async getEvents(): Promise<Event[]> {
    const { data, error } = await this.supabase
      .from(TableNames.Events)
      .select('*');
    if (error) {
      throw error;
    }
    return data;
  }

  async getPendingEvents(): Promise<Event[]> {
    const { data, error } = await this.supabase
      .from(TableNames.Events)
      .select('*')
      .eq('state', 'pending');
    if (error) {
      throw error;
    }
    return data;
  }

  async getClubEvents(id: number): Promise<Event[]> {
    const { data, error } = await this.supabase
      .from(TableNames.Events)
      .select('*')
      .eq('id_club', id);
    if (error) {
      throw error;
    }
    return data;
  }

  async getEventById(id: number): Promise<Event[]> {
    const { data, error } = await this.supabase
      .from(TableNames.Events)
      .select('*')
      .eq('id', id);
    if (error) {
      throw error;
    }
    return data;
  }

  async getEventByName(name: string): Promise<Event | null> {
    const { data, error } = await this.supabase
      .from(TableNames.Events)
      .select('*')
      .eq('name', name);
    if (error) {
      throw error;
    }
    return data ? data[0] : null;
  }

  async validateEventByDve(event: Event): Promise<Event[]> {
    const updatedEvent: Event = { ...event, state: 'active' };
    const { data, error } = await this.supabase
      .from(TableNames.Clubs)
      .update(updatedEvent)
      .eq('id', event.id);
    if (error) {
      throw error;
    }
    return data ? data : [];
  }

  async validateEventByRef(event: Event): Promise<Event[]> {
    const updatedEvent: Event = { ...event, state: 'waiting dve validation' };
    const { data, error } = await this.supabase
      .from(TableNames.Clubs)
      .update(updatedEvent)
      .eq('id', event.id);
    if (error) {
      throw error;
    }
    return data ? data : [];
  }

  async addEvent(event: NewEvent): Promise<void> {
    const { data, error } = await this.supabase
      .from(TableNames.Events)
      .insert([event]);
    if (error) {
      throw error;
    }
  }

  async updateEvent(id: number, event: UpdatedEvent): Promise<Event[]> {
    const { data, error } = await this.supabase
      .from(TableNames.Events)
      .update(event)
      .eq('id', id);

    if (error) {
      throw error;
    }

    return data ? data : [];
  }

  async deleteEventById(id: number): Promise<Event[]> {
    const { data, error } = await this.supabase
      .from(TableNames.Events)
      .delete()
      .eq('id', id);
    if (error) {
      throw error;
    }
    return data ? data : [];
  }

  async getTotalSupplementaryBudget(): Promise<number> {
    const { data, error } = await this.supabase
      .from(TableNames.Events)
      .select('supp_budget');
    if (error) {
      throw error;
    }

    // Summing up the supp_budget values
    const totalSupplementaryBudget = data
      ? data.reduce((acc, event) => acc + event.supp_budget, 0)
      : 0;
    return totalSupplementaryBudget;
  }

  async getTotalSupplementaryBudgetByClub(clubId: number): Promise<number> {
    // Fetch events related to the club
    const { data: events, error: eventsError } = await this.supabase
      .from(TableNames.Events)
      .select('supp_budget')
      .eq('id_club', clubId);
    if (eventsError) {
      throw eventsError;
    }

    // Calculate the total supplementary budget for the club
    const totalSupplementaryBudget = events
      ? events.reduce((acc, event) => acc + event.supp_budget, 0)
      : 0;
    return totalSupplementaryBudget;
  }

  async getTotalSuppEarningsByClub(clubId: number): Promise<number> {
    // Fetch events related to the club
    const { data: events, error: eventsError } = await this.supabase
      .from(TableNames.Events)
      .select('earnings')
      .eq('id_club', clubId);
    if (eventsError) {
      throw eventsError;
    }
    // Calculate the total supplementary earnings for the club
    const totalSuppEarnings = events
      ? events.reduce((acc, event) => acc + event.earnings, 0)
      : 0;
    return totalSuppEarnings;
  }

  // ============== Documents ============== //

  async addDocument(doc: NewDocument): Promise<void> {
    const { data, error } = await this.supabase
      .from(TableNames.Documents)
      .insert([doc]);
    if (error) {
      throw error;
    }
  }

  async validateRequestByDve(doc: Document): Promise<Document[]> {
    const updatedRequest: Document = { ...doc, state: 'active' };
    const { data, error } = await this.supabase
      .from(TableNames.Documents)
      .update(updatedRequest)
      .eq('id', doc.id);
    if (error) {
      throw error;
    }
    return data ? data : [];
  }

  async validateRequestByRef(doc: Document): Promise<Document[]> {
    const updatedRequest: Document = {
      ...doc,
      state: 'waiting dve validation',
    };
    const { data, error } = await this.supabase
      .from(TableNames.Documents)
      .update(updatedRequest)
      .eq('id', doc.id);
    if (error) {
      throw error;
    }
    return data ? data : [];
  }

  async getPendingDocuments(): Promise<Document[]> {
    const { data, error } = await this.supabase
      .from(TableNames.Documents)
      .select('*')
      .eq('state', 'pending');
    if (error) {
      throw error;
    }
    return data;
  }

  // ============== Budget ============== //

  async addBudget(budget: Budget): Promise<Budget[]> {
    const { data, error } = await this.supabase
      .from(TableNames.Budget)
      .insert([budget]);
    if (error) {
      throw error;
    }
    return data ? data : [];
  }

  async getBudgets(): Promise<Budget[]> {
    const { data, error } = await this.supabase
      .from(TableNames.Budget)
      .select('*');
    if (error) {
      throw error;
    }
    return data;
  }

  async getBudgetByClub(id: number): Promise<Budget[]> {
    const { data, error } = await this.supabase
      .from(TableNames.Budget)
      .select('*')
      .eq('id_club', id);
    if (error) {
      throw error;
    }
    return data;
  }

  async getClubBudget(id: number): Promise<number> {
    try {
      const currentYear = new Date().getFullYear();

      // Fetch budgets for the given club and current year
      const { data, error } = await this.supabase
        .from(TableNames.Budget)
        .select('budget')
        .eq('id_club', id)
        .eq('year', currentYear);

      if (error) {
        throw error;
      }
      return data.length > 0 ? data[0].budget : 0;
    } catch (error) {
      throw error;
    }
  }

  async getBudgetByYear(year: number): Promise<Budget[]> {
    const { data, error } = await this.supabase
      .from(TableNames.Budget)
      .select('*')
      .eq('year', year);
    if (error) {
      throw error;
    }
    return data;
  }

  async getRestBudgetByClub(id: number): Promise<number> {
    const currentYear = new Date().getFullYear();

    const { data, error } = await this.supabase
      .from(TableNames.Budget)
      .select('rest')
      .eq('id_club', id)
      .eq('year', currentYear);
    if (error) {
      throw error;
    }
    return data.length > 0 ? data[0].rest : 0;
  }

  async getTotalBudgetByYear(year: number): Promise<number> {
    const { data: budgets, error } = await this.supabase
      .from(TableNames.Budget)
      .select('budget')
      .eq('year', year);
    if (error) {
      throw error;
    }

    if (budgets && budgets.length > 0) {
      // Calculate the total budget for the given year
      const totalBudget = budgets.reduce(
        (sum, budget) => sum + budget.budget,
        0
      );
      return totalBudget;
    }

    // Return 0 if there are no budgets for the given year
    return 0;
  }
}
