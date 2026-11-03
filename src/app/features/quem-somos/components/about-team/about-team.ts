import { Component, inject, input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TeamMember } from '../../../../core/services/team/team';
import { AuthService } from '../../../../core/services/auth/auth';

@Component({
  selector: 'app-about-team',
  imports: [RouterModule],
  templateUrl: './about-team.html',
  styleUrl: './about-team.scss',
})
export class AboutTeamComponent {
  authService = inject(AuthService);

  team = input<TeamMember[]>([]);
  isLoading = input<boolean>(false);
}
