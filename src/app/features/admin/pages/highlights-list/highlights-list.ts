import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Highlight, HighlightsService } from '../../../../core/services/highlights/highlights';

@Component({
  selector: 'app-highlights-list',
  imports: [CommonModule, RouterModule],
  templateUrl: './highlights-list.html',
  styleUrl: './highlights-list.scss',
})
export class HighlightsListComponent implements OnInit {
  private highlightsService = inject(HighlightsService);

  highlights = signal<Highlight[]>([]);
  isLoading = signal(true);

  ngOnInit(): void {
    this.loadHighlights();
  }

  async loadHighlights(): Promise<void> {
    this.isLoading.set(true);
    const data = await this.highlightsService.getAllHighlights();
    this.highlights.set(data);
    this.isLoading.set(false);
  }

  async deleteHighlight(id: number | undefined, event: MouseEvent): Promise<void> {
    event.preventDefault();
    event.stopPropagation();

    if (!id || !confirm('Tem certeza que deseja remover este destaque?')) {
      return;
    }

    const { error } = await this.highlightsService.deleteHighlight(id);
    if (error) {
      alert('Não foi possível remover o destaque.');
      return;
    }

    await this.loadHighlights();
  }

  async toggleActive(highlight: Highlight, event: MouseEvent): Promise<void> {
    event.preventDefault();
    event.stopPropagation();

    if (!highlight.id) return;

    const { error } = await this.highlightsService.updateHighlight(highlight.id, {
      active: !highlight.active,
    });

    if (error) {
      alert('Não foi possível atualizar o status do destaque.');
      return;
    }

    await this.loadHighlights();
  }
}
