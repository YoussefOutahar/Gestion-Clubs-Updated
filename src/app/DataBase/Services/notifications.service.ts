import { Injectable } from '@angular/core';

import { SupabaseClient, createClient } from '@supabase/supabase-js';
import { supabaseEnvironment } from 'src/environments/environment';

import { TableNames } from 'src/app/Config/constants';

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
    const { data, error } = await this.supabase.from(TableNames.Notifications).select('*');
    if (error) {
      throw error;
    }
    return data;
  }

  async getNotificationById(id: string): Promise<Notification[]> {
    const { data, error } = await this.supabase.from(TableNames.Notifications).select('*').eq('id', id);
    if (error) {
      throw error;
    }
    return data;
  }

  async updateNotification(notification: Notification): Promise<Notification[]> {
    const { data, error } = await this.supabase.from(TableNames.Notifications).update(notification).eq('id', notification.id);
    if (error) {
      throw error;
    }
    return data ? data : [];
  }

  async deleteNotificationById(notification: Notification): Promise<Notification[]> {
    const { data, error } = await this.supabase.from(TableNames.Notifications).delete().eq('id', notification.id);
    if (error) {
      throw error;
    }
    return data ? data : [];
  }
}
