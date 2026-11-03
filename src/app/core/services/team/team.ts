import { Injectable, inject } from '@angular/core';
import { SupabaseService } from '../supabase/supabase';

export interface TeamMember {
  id?: number;
  name: string;
  role: string;
  photo_url: string;
  order_index: number;
  active: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class TeamService {
  private supabaseService = inject(SupabaseService);
  private supabase = this.supabaseService.client;

  private readonly TABLE = 'team';
  private readonly BUCKET = 'team-photos';

  async getActiveTeamMembers(): Promise<TeamMember[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('active', true)
      .order('order_index', { ascending: true });

    if (error) {
      console.error('Erro ao buscar equipe:', error);
      return [];
    }
    return data as TeamMember[];
  }

  async getAllTeamMembers(): Promise<TeamMember[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .order('order_index', { ascending: true });

    if (error) {
      console.error('Erro ao buscar todos os membros da equipe:', error);
      return [];
    }
    return data as TeamMember[];
  }

  async getTeamMemberById(id: number): Promise<TeamMember | null> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Erro ao buscar membro da equipe por ID:', error);
      return null;
    }
    return data as TeamMember;
  }

  async createTeamMember(member: Partial<TeamMember>) {
    const { data, error } = await this.supabase.from(this.TABLE).insert([member]).select();
    if (error) console.error('Erro ao criar membro:', error);
    return { data, error };
  }

  async updateTeamMember(id: number, member: Partial<TeamMember>) {
    const { data, error } = await this.supabase.from(this.TABLE).update(member).eq('id', id).select();
    if (error) console.error('Erro ao atualizar membro:', error);
    return { data, error };
  }

  async deleteTeamMember(id: number) {
    const { error } = await this.supabase.from(this.TABLE).update({ active: false }).eq('id', id);
    if (error) console.error('Erro ao fazer soft delete do membro:', error);
    return { error };
  }

  async uploadPhoto(file: File): Promise<string | null> {
    try {
      const fileName = `${Date.now()}-${file.name.replace(/\s+/g, '-')}`;

      const { error: uploadError } = await this.supabase.storage
        .from(this.BUCKET)
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { data } = this.supabase.storage.from(this.BUCKET).getPublicUrl(fileName);
      return data.publicUrl;
    } catch (error) {
      console.error('Erro no upload da foto da equipe:', error);
      return null;
    }
  }
}
