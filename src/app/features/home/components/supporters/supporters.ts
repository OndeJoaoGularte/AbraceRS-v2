import { Component, inject, input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../../core/services/auth/auth';

export interface Supporter {
  id?: number;
  name: string;
  image_url: string;
  link_url: string;
  tier: 'master' | 'standard';
}

@Component({
  selector: 'app-supporters',
  imports: [RouterModule],
  templateUrl: './supporters.html',
  styleUrl: './supporters.scss',
})
export class SupportersComponent {
  authService = inject(AuthService);

  isLoading = input<boolean>(true);
  masters = input<Supporter[]>([]);
  standards = input<Supporter[]>([]);
}
