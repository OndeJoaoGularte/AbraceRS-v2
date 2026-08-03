import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey);

    if (!environment.supabaseUrl) {
      throw new Error('Erro de build: A variável SUPABASE_URL não foi definida no Vercel.');
    }
    if (!environment.supabaseKey) {
      throw new Error('Erro de build: A variável SUPABASE_KEY não foi definida no Vercel.');
    }
  }
}