import { Injectable, inject } from '@angular/core';
import { SupabaseService } from '../supabase/supabase';

export interface Highlight {
  id?: number;
  title: string;
  summary?: string | null;
  cta_label: string;
  file_url?: string | null;
  link_url?: string | null;
  image_url?: string | null;
  starts_at?: string | null;
  ends_at?: string | null;
  sort_order: number;
  active: boolean;
  status: boolean;
  created_at?: string;
  updated_at?: string;
}

@Injectable({
  providedIn: 'root',
})
export class HighlightsService {
  private supabaseService = inject(SupabaseService);
  private supabase = this.supabaseService.client;

  private readonly TABLE = 'highlights';
  private readonly BUCKET = 'documents';

  async getActiveHighlights(): Promise<Highlight[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('status', true)
      .eq('active', true)
      .order('sort_order', { ascending: true })
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Erro ao buscar highlights ativos:', error);
      return [];
    }

    const now = Date.now();
    return ((data || []) as Highlight[]).filter((highlight) => {
      const startsOk = !highlight.starts_at || new Date(highlight.starts_at).getTime() <= now;
      const endsOk = !highlight.ends_at || new Date(highlight.ends_at).getTime() >= now;
      return startsOk && endsOk;
    });
  }

  async getAllHighlights(): Promise<Highlight[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('status', true)
      .order('sort_order', { ascending: true })
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Erro ao buscar todos os highlights:', error);
      return [];
    }
    return (data || []) as Highlight[];
  }

  async getHighlightById(id: number): Promise<Highlight | null> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('id', id)
      .eq('status', true)
      .single();

    if (error) {
      console.error('Erro ao buscar highlight por ID:', error);
      return null;
    }
    return data as Highlight;
  }

  async createHighlight(highlight: Partial<Highlight>) {
    const { data, error } = await this.supabase.from(this.TABLE).insert([highlight]).select();
    if (error) console.error('Erro ao criar highlight:', error);
    return { data, error };
  }

  async updateHighlight(id: number, highlight: Partial<Highlight>) {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .update(highlight)
      .eq('id', id)
      .select();
    if (error) console.error('Erro ao atualizar highlight:', error);
    return { data, error };
  }

  async deleteHighlight(id: number) {
    const { error } = await this.supabase
      .from(this.TABLE)
      .update({ status: false })
      .eq('id', id);
    if (error) console.error('Erro ao fazer soft delete do highlight:', error);
    return { error };
  }

  private sanitizeFileName(name: string): string {
    const normalized = name
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-zA-Z0-9._-]+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');

    return normalized || 'arquivo';
  }

  async uploadDocument(file: File): Promise<string | null> {
    try {
      const fileName = `${Date.now()}-${this.sanitizeFileName(file.name)}`;

      const { error: uploadError } = await this.supabase.storage
        .from(this.BUCKET)
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { data } = this.supabase.storage.from(this.BUCKET).getPublicUrl(fileName);
      return data.publicUrl;
    } catch (error) {
      console.error('Erro no upload do documento:', error);
      return null;
    }
  }

  async uploadImage(file: File): Promise<string | null> {
    return this.uploadDocument(file);
  }
}
