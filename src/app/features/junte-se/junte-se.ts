import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../core/services/auth/auth';
import { JunteSelectionComponent } from './components/junte-selection/junte-selection';
import { CommonModule } from '@angular/common';
import { JunteFormComponent } from './components/junte-form/junte-form';
import { JunteAdminComponent } from './components/junte-admin/junte-admin';

@Component({
  selector: 'app-junte-se',
  imports: [CommonModule, JunteSelectionComponent, JunteFormComponent, JunteAdminComponent],
  templateUrl: './junte-se.html',
  styleUrl: './junte-se.scss',
})
export class JunteSeComponent implements OnInit {
  public authService = inject(AuthService);
  private route = inject(ActivatedRoute);

  viewMode = signal<'selection' | 'form' | 'admin'>('selection');
  activeForm = signal<'associate' | 'volunteer' | null>(null);

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const formType = params['form'];
      if (formType === 'associate' || formType === 'volunteer') {
        this.showForm(formType);
      }
    });
  }

  showForm(type: 'associate' | 'volunteer'): void {
    this.activeForm.set(type);
    this.viewMode.set('form');
  }

  resetView(): void {
    this.activeForm.set(null);
    this.viewMode.set('selection');
  }

  showAdminView(): void {
    this.viewMode.set('admin');
  }
}