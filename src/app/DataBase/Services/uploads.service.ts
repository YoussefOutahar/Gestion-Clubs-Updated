import { Injectable } from '@angular/core';

import { SupabaseClient, createClient } from '@supabase/supabase-js';
import { supabaseEnvironment } from 'src/environments/environment';

import { StorageNames } from 'src/app/Config/constants';



@Injectable({
  providedIn: 'root',
})
export class UploadsService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(
      supabaseEnvironment.supabaseUrl,
      supabaseEnvironment.supabaseKey
    );
  }

  async uploadEventBudget(selectedFile: File): Promise<void> {
    const { data, error } = await this.supabase.storage
      .from(StorageNames.BudgetEvent)
      .upload(selectedFile.name, selectedFile);

    if (error) {
      throw error;
    }

    // You can handle the uploaded data if needed, but it's not clear what you want to do with it.
    console.log('Uploaded data:', data);
  }

}
