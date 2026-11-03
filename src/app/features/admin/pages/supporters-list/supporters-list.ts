import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Supporter, SupportersService } from '../../../../core/services/supporters/supporters';

@Component({
  selector: 'app-supporters-list',
  imports: [CommonModule, RouterModule],
  templateUrl: './supporters-list.html',
  styleUrl: './supporters-list.scss',
})
export class SupportersListComponent implements OnInit {
  private supportersService = inject(SupportersService);

  supporters = signal<Supporter[]>([]);
  isLoading = signal(true);

  ngOnInit(): void {
    this.loadSupporters();
  }

  async loadSupporters(): Promise<void> {
    this.isLoading.set(true);
    const data = await this.supportersService.getAllSupporters();
    this.supporters.set(data);
    this.isLoading.set(false);
  }

  async deleteSupporter(id: number | undefined, event: MouseEvent): Promise<void> {
    event.preventDefault();
    event.stopPropagation();

    if (!id || !confirm('Tem certeza que deseja remover este apoiador?')) {
      return;
    }

    const { error } = await this.supportersService.deleteSupporter(id);
    if (error) {
      alert('Não foi possível remover o apoiador.');
      return;
    }

    await this.loadSupporters();
  }

  async reactivateSupporter(id: number | undefined, event: MouseEvent): Promise<void> {
    event.preventDefault();
    event.stopPropagation();

    if (!id) return;

    const { error } = await this.supportersService.updateSupporter(id, { active: true });
    if (error) {
      alert('Não foi possível reativar o apoiador.');
      return;
    }

    await this.loadSupporters();
  }
}
