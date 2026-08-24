import { Component, input } from '@angular/core';
import { TeamMember } from '../../../../core/services/team/team';

@Component({
  selector: 'app-about-team',
  imports: [],
  templateUrl: './about-team.html',
  styleUrl: './about-team.scss',
})
export class AboutTeamComponent {
  team = input<TeamMember[]>([]);
  isLoading = input<boolean>(false);
}
