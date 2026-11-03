import { Component, HostListener, inject, signal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth/auth';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class HeaderComponent {
  public authService = inject(AuthService);
  private router = inject(Router);

  isMenuOpen = signal(false);
  isAdminMenuOpen = signal(false);
  isScrolled = signal(false);

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    const currentScroll = window.scrollY;

    if (!this.isScrolled() && currentScroll > 60) {
      this.isScrolled.set(true);
    } else if (this.isScrolled() && currentScroll < 10) {
      this.isScrolled.set(false);
    }
  }

  @HostListener('document:click')
  onDocumentClick(): void {
    if (this.isAdminMenuOpen()) {
      this.isAdminMenuOpen.set(false);
    }
  }

  toggleMenu(): void {
    this.isMenuOpen.update((v) => !v);
    if (!this.isMenuOpen()) {
      this.isAdminMenuOpen.set(false);
    }
  }

  toggleAdminMenu(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    this.isAdminMenuOpen.update((v) => !v);
  }

  keepAdminMenuOpen(event: Event): void {
    event.stopPropagation();
  }

  closeMenu(): void {
    this.isMenuOpen.set(false);
    this.isAdminMenuOpen.set(false);
  }

  async onSignOut(): Promise<void> {
    this.closeMenu();
    await this.authService.signOut();
    this.router.navigate(['/']);
  }
}
