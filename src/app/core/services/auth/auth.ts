import { Injectable, inject, signal } from '@angular/core';
import { User } from '@supabase/supabase-js';
import { SupabaseService } from '../supabase/supabase';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private supabaseService = inject(SupabaseService);
  private supabase = this.supabaseService.client;

  currentUser = signal<User | null>(null);
  private authReady = signal(false);

  private readyResolve!: () => void;
  private readyPromise = new Promise<void>((resolve) => {
    this.readyResolve = resolve;
  });

  constructor() {
    this.supabase.auth.getSession().then(({ data: { session } }) => {
      this.currentUser.set(session?.user ?? null);
      this.markReady();
    });

    this.supabase.auth.onAuthStateChange((_event, session) => {
      this.currentUser.set(session?.user ?? null);
      this.markReady();
    });
  }

  private markReady(): void {
    if (!this.authReady()) {
      this.authReady.set(true);
      this.readyResolve();
    }
  }

  whenReady(): Promise<void> {
    return this.readyPromise;
  }

  isLoggedIn(): boolean {
    return this.currentUser() !== null;
  }

  async signIn(email: string, password: string) {
    const { data, error } = await this.supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;
    return data;
  }

  async signOut() {
    const { error } = await this.supabase.auth.signOut();
    if (error) throw error;
  }
}
