import { Injectable } from '@angular/core';

import { SupabaseClient, createClient } from '@supabase/supabase-js';
import { supabaseEnvironment } from '../../../environments/environment';
import { format, subMonths } from 'date-fns';
import { TableNames } from '../../Config/constants';

import { Notification } from '../Models/notification';

@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(
      supabaseEnvironment.supabaseUrl,
      supabaseEnvironment.supabaseKey
    );
  }

  async getNotifications(): Promise<Notification[]> {
    const { data, error } = await this.supabase
      .from(TableNames.Notifications)
      .select('*');
    if (error) {
      throw error;
    }
    return data;
  }

  async getNotificationById(id: string): Promise<Notification[]> {
    const { data, error } = await this.supabase
      .from(TableNames.Notifications)
      .select('*')
      .eq('id', id);
    if (error) {
      throw error;
    }
    return data;
  }

  async getNotificationsByClub(id: number): Promise<Notification[]> {
    const { data, error } = await this.supabase
      .from(TableNames.Notifications)
      .select('*')
      .eq('id_club', id);

    if (error) {
      throw error;
    }
    return data;
  }

  async getAdminNotifications(): Promise<Notification[]> {
    const { data, error } = await this.supabase
      .from(TableNames.Notifications)
      .select('*')
      .eq('to', "admin");

    if (error) {
      throw error;
    }
    return data;
  }

  async getClubsNotifications(id: number): Promise<Notification[]> {
    const currentDate = new Date();
    const threeMonthsAgo = subMonths(currentDate, 3);

    const { data: clubNotifications, error: clubError } = await this.supabase
      .from(TableNames.Notifications)
      .select('*')
      .eq('id_club', id)
      .gte('date', format(threeMonthsAgo, 'yyyy-MM-dd')) // Filter by date
      .order('date', { ascending: false }); // Order by date in descending order

    const { data: nullNotifications, error: nullError } = await this.supabase
      .from(TableNames.Notifications)
      .select('*')
      .is('id_club', null)
      .gte('date', format(threeMonthsAgo, 'yyyy-MM-dd')) // Filter by date
      .order('date', { ascending: false }); // Order by date in descending order

    if (clubError || nullError) {
      throw clubError || nullError;
    }

    // Combine and return both sets of notifications
    return [...clubNotifications, ...nullNotifications];
  }

  async addNotification(notification: Notification): Promise<Notification[]> {
    const { data, error } = await this.supabase
      .from(TableNames.Notifications)
      .insert([notification]);
    if (error) {
      throw error;
    }
    return data ? data : [];
  }

  async updateNotification(
    notification: Notification
  ): Promise<Notification[]> {
    const { data, error } = await this.supabase
      .from(TableNames.Notifications)
      .update(notification)
      .eq('id', notification.id);
    if (error) {
      throw error;
    }
    return data ? data : [];
  }

  async deleteNotificationById(
    notification: Notification
  ): Promise<Notification[]> {
    const { data, error } = await this.supabase
      .from(TableNames.Notifications)
      .delete()
      .eq('id', notification.id);
    if (error) {
      throw error;
    }
    return data ? data : [];
  }
}
