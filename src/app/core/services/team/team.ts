import { inject, Service } from '@angular/core';
import { SupabaseService } from '../supabase/supabase';

export interface TeamMember {
  id?: number;
  name: string;
  role: string;
  photo_url: string;
  order_index: number;
  active: boolean;
}

@Service()
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
