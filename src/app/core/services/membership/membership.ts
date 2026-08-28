import { inject, Injectable } from '@angular/core';
import { SupabaseService } from '../supabase/supabase';

export interface AssociateData {
  id?: number;
  person_type: 'PESSOA_FISICA' | 'PESSOA_JURIDICA';
  name: string;
  email: string;
  phone: string;
  document: string;
  contact_person?: string;
  created_at?: string;
}

export interface VolunteerData {
  id?: number;
  name: string;
  email: string;
  phone: string;
  cpf: string;
  how_to_help: string;
  created_at?: string;
}

@Injectable({
  providedIn: 'root'
})
export class MembershipService {
  private supabaseService = inject(SupabaseService);

  async submitAssociateForm(formData: AssociateData): Promise<{ success: boolean; error?: any }> {
    const { error } = await this.supabaseService.client
      .from('associates')
      .insert([formData]);

    if (error) {
      console.error('Erro ao enviar formulário de associado:', error);
      return { success: false, error };
    }
    
    return { success: true };
  }

  async submitVolunteerForm(formData: VolunteerData): Promise<{ success: boolean; error?: any }> {
    const { error } = await this.supabaseService.client
      .from('volunteers')
      .insert([formData]);
      
    if (error) {
      console.error('Erro ao enviar formulário de voluntário:', error);
      return { success: false, error };
    }
    
    return { success: true };
  }

  async getAssociates(): Promise<AssociateData[]> {
    const { data, error } = await this.supabaseService.client
      .from('associates')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Erro ao buscar associados:', error);
      return [];
    }
    
    return data || [];
  }

  async getVolunteers(): Promise<VolunteerData[]> {
    const { data, error } = await this.supabaseService.client
      .from('volunteers')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Erro ao buscar voluntários:', error);
      return [];
    }
    
    return data || [];
  }
}