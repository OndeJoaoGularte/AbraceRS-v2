import { Component, input } from '@angular/core';

export interface Supporter {
  id?: number;
  name: string;
  image_url: string;
  link_url: string;
  tier: 'master' | 'standard';
}

@Component({
  selector: 'app-supporters',
  imports: [],
  templateUrl: './supporters.html',
  styleUrl: './supporters.scss',
})
export class SupportersComponent {
  masters = input<Supporter[]>([]);
  standards = input<Supporter[]>([]);
}
