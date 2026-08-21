import { Component, input } from '@angular/core';
import { TeamMember } from '../../../../core/services/team/team';

@Component({
  selector: 'app-team',
  imports: [],
  templateUrl: './team.html',
  styleUrl: './team.scss',
})
export class TeamComponent {
  team = input<TeamMember[]>([]);
  isLoading = input<boolean>(false);
}
