import { Injectable, inject } from '@angular/core';
import { SupabaseService } from '../supabase/supabase';

export interface Supporter {
  id?: number;
  name: string;
  image_url: string;
  link_url: string;
  tier: 'master' | 'standard';
  active: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class SupportersService {
  private supabaseService = inject(SupabaseService);
  private supabase = this.supabaseService.client;

  private readonly TABLE = 'supporters';
  private readonly BUCKET = 'supporter-logos';

  async getActiveSupporters(): Promise<Supporter[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('active', true)
      .order('tier', { ascending: true })
      .order('name', { ascending: true });

    if (error) {
      console.error('Erro ao buscar apoiadores:', error);
      return [];
    }
    return data as Supporter[];
  }

  async getAllSupporters(): Promise<Supporter[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .order('tier', { ascending: true })
      .order('name', { ascending: true });

    if (error) {
      console.error('Erro ao buscar todos os apoiadores:', error);
      return [];
    }
    return data as Supporter[];
  }

  async getSupporterById(id: number): Promise<Supporter | null> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Erro ao buscar apoiador por ID:', error);
      return null;
    }
    return data as Supporter;
  }

  async createSupporter(supporter: Partial<Supporter>) {
    const { data, error } = await this.supabase.from(this.TABLE).insert([supporter]).select();
    if (error) console.error('Erro ao criar apoiador:', error);
    return { data, error };
  }

  async updateSupporter(id: number, supporter: Partial<Supporter>) {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .update(supporter)
      .eq('id', id)
      .select();
    if (error) console.error('Erro ao atualizar apoiador:', error);
    return { data, error };
  }

  async deleteSupporter(id: number) {
    const { error } = await this.supabase.from(this.TABLE).update({ active: false }).eq('id', id);
    if (error) console.error('Erro ao fazer soft delete do apoiador:', error);
    return { error };
  }

  async uploadLogo(file: File): Promise<string | null> {
    try {
      const fileName = `${Date.now()}-${file.name.replace(/\s+/g, '-')}`;

      const { error: uploadError } = await this.supabase.storage
        .from(this.BUCKET)
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { data } = this.supabase.storage.from(this.BUCKET).getPublicUrl(fileName);
      return data.publicUrl;
    } catch (error) {
      console.error('Erro no upload da logo:', error);
      return null;
    }
  }
}
