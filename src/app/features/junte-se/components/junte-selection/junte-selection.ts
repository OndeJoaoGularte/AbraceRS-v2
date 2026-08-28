import { Component, output } from '@angular/core';

@Component({
  selector: 'app-junte-selection',
  imports: [],
  templateUrl: './junte-selection.html',
  styleUrl: './junte-selection.scss',
})
export class JunteSelectionComponent {
  onSelect = output<'associate' | 'volunteer'>();

  selectCard(type: 'associate' | 'volunteer'): void {
    this.onSelect.emit(type);
  }
}