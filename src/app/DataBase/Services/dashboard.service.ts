import { Injectable } from '@angular/core';
import { SupabaseClient, createClient } from '@supabase/supabase-js';
import { supabaseEnvironment } from '../../../environments/environment';
import { TableNames } from '../..//Config/constants';
import { Budget, Club, Event } from '../Models/club';
import { ClubsService } from './clubs.service';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private supabase: SupabaseClient;

  constructor(private clubService: ClubsService) {
    this.supabase = createClient(
      supabaseEnvironment.supabaseUrl,
      supabaseEnvironment.supabaseKey
    );
  }

  async getClubsWithEventCounts(): Promise<
    { clubName: string; eventCount: number }[]
  > {
    const clubs = await this.clubService.getActiveClubs();

    const clubsWithEventCounts: { clubName: string; eventCount: number }[] = [];
    const currentYear = new Date().getFullYear();

    for (const club of clubs) {
      const { data: events, error: eventsError } = await this.supabase
        .from(TableNames.Events)
        .select('id')
        .eq('id_club', club.id) // Assuming 'id' is the primary key of the 'Events' table and 'club_id' is the foreign key
        .gte('date', `${currentYear}-01-01 00:00:00Z`) // Filter events from the beginning of the current year
        .lte('date', `${currentYear}-12-31 23:59:59Z`); // Filter events until the end of the current year

      if (eventsError) {
        throw eventsError;
      }

      clubsWithEventCounts.push({
        clubName: club.name,
        eventCount: events.length,
      });
    }

    return clubsWithEventCounts;
  }

  async getUpcomingEvent(): Promise<Event | null> {
    const currentDateTime = new Date().toISOString();
    const { data: upcomingEvents, error: eventsError } = await this.supabase
      .from(TableNames.Events)
      .select('*')
      .gte('date', currentDateTime)
      .order('date', { ascending: true })
      .limit(1);

    if (eventsError) {
      throw eventsError;
    }

    if (upcomingEvents && upcomingEvents.length > 0) {
      return upcomingEvents[0];
    }

    return null;
  }

  async getEventCountByYear(): Promise<{ year: string; eventCount: number }[]> {
    const { data: events, error: eventsError } = await this.supabase
      .from(TableNames.Events)
      .select('id, date');

    if (eventsError) {
      throw eventsError;
    }

    const eventCountByYear: { [year: string]: number } = {};

    events.forEach((event) => {
      const eventYear = new Date(event.date).getFullYear();
      eventCountByYear[eventYear.toString()] =
        (eventCountByYear[eventYear.toString()] || 0) + 1;
    });

    const result: { year: string; eventCount: number }[] = [];

    for (const year in eventCountByYear) {
      if (eventCountByYear.hasOwnProperty(year)) {
        result.push({ year, eventCount: eventCountByYear[year] });
      }
    }

    return result;
  }

  async getEventCountByYearByClub(
    id: number
  ): Promise<{ year: string; eventCount: number }[]> {
    const { data: events, error: eventsError } = await this.supabase
      .from(TableNames.Events)
      .select('id, date')
      .eq('id_club', id);

    if (eventsError) {
      throw eventsError;
    }

    const eventCountByYear: { [year: string]: number } = {};

    events.forEach((event) => {
      const eventYear = new Date(event.date).getFullYear();
      eventCountByYear[eventYear.toString()] =
        (eventCountByYear[eventYear.toString()] || 0) + 1;
    });

    const result: { year: string; eventCount: number }[] = [];

    for (const year in eventCountByYear) {
      if (eventCountByYear.hasOwnProperty(year)) {
        result.push({ year, eventCount: eventCountByYear[year] });
      }
    }

    return result;
  }
  async getClubBudgetsByYearsv(
    id: number
  ): Promise<{ year: string; budget: number }[]> {
    const { data: budgets, error: eventsError } = await this.supabase
      .from(TableNames.Budget)
      .select('budget, year')
      .eq('id_club', id);

    if (eventsError) {
      throw eventsError;
    }

    const budgetCountByYear: { [year: string]: number } = {};

    budgets.forEach((event) => {
      const eventYear = new Date(event.year).getFullYear();
      budgetCountByYear[eventYear.toString()] =
        (budgetCountByYear[eventYear.toString()] || 0) + 1;
    });

    const result: { year: string; budget: number }[] = [];

    for (const year in budgetCountByYear) {
      if (budgetCountByYear.hasOwnProperty(year)) {
        result.push({ year, budget: budgetCountByYear[year] });
      }
    }

    return result;
  }

  async getClubBudgetsByYears(
    id: number
  ): Promise<{ budget: number; year: string }[]> {
    const { data, error } = await this.supabase
      .from(TableNames.Budget)
      .select('budget, year')
      .eq('id_club', id)
      .order('year', { ascending: true });
    if (error) {
      throw error;
    }
    return data;
  }

  async getTotalClubs(): Promise<number> {
    const { count, error } = await this.supabase
      .from(TableNames.Clubs)
      .select('*', { count: 'exact' })
      .eq('state', 'active');
    if (error) {
      throw error;
    }
    return count || 0;
  }

  async getTotalEvents(): Promise<number> {
    const { count, error } = await this.supabase
      .from(TableNames.Events)
      .select('*', { count: 'exact' });
    if (error) {
      throw error;
    }
    return count || 0;
  }

  async getTotalMembers(): Promise<number> {
    const { count, error } = await this.supabase
      .from(TableNames.Profiles)
      .select('*', { count: 'exact' });
    if (error) {
      throw error;
    }
    return count || 0;
  }

  async getTotalClubMembers(clubId: number): Promise<number> {
    const { count, error } = await this.supabase
      .from(TableNames.Profiles)
      .select('*', { count: 'exact' })
      .eq('id_club', clubId);
    if (error) {
      throw error;
    }
    return count || 0;
  }

  async getTotalClubMeetings(clubId: number): Promise<number> {
    const { count, error } = await this.supabase
      .from(TableNames.Meetings)
      .select('*', { count: 'exact' })
      .eq('id_club', clubId);
    if (error) {
      throw error;
    }
    return count || 0;
  }

  async getTotalClubBudget(clubId: number): Promise<number> {
    const { data, error } = await this.supabase
      .from(TableNames.Budget)
      .select('*')
      .eq('id_club', clubId);
    if (error) {
      throw error;
    }

    let sum: number = 0;
    for (const budget of data) {
      sum += budget.budget;
    }
    return sum;
  }
}
