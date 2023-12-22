import { Injectable } from '@angular/core';
import { SupabaseClient, createClient } from '@supabase/supabase-js';
import { supabaseEnvironment } from '../../../environments/environment';
import { TableNames } from '../..//Config/constants';
import { Club, Event } from '../Models/club';
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

    async getClubsWithEventCounts(): Promise<{ clubName: string; eventCount: number }[]> {
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
                clubName: club.name, // Assuming 'name' is the property containing the club name
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

}