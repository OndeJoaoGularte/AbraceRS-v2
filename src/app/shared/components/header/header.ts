import { Component, HostListener, inject, signal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Auth } from '../../../core/services/auth/auth';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  public authService = inject(Auth);
  private router = inject(Router);

  isMenuOpen = signal<boolean>(false);
  isScrolled = signal<boolean>(false);

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    const scrolled = window.scrollY > 50;
    if (this.isScrolled() !== scrolled) {
      this.isScrolled.set(scrolled);
    }
  }

  toggleMenu(): void {
    this.isMenuOpen.update((v) => !v);
  }

  closeMenu(): void {
    this.isMenuOpen.set(false);
  }

  openVakinha(): void {
    this.closeMenu();
    window.open('https://www.vakinha.com.br/5580617', '_blank');
  }

  async onSignOut(): Promise<void> {
    await this.authService.signOut();
    this.router.navigate(['/']);
  }
}
