import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TeamMember, TeamService } from '../../core/services/team/team';
import { AboutAnswerComponent } from './components/about-answer/about-answer';
import { AboutMissionComponent } from './components/about-mission/about-mission';
import { AboutTeamComponent } from './components/about-team/about-team';
import { AboutTransparencyComponent } from './components/about-transparency/about-transparency';

@Component({
  selector: 'app-quem-somos',
  imports: [
    CommonModule,
    RouterModule,
    AboutAnswerComponent,
    AboutMissionComponent,
    AboutTeamComponent,
    AboutTransparencyComponent
  ],
  templateUrl: './quem-somos.html',
  styleUrl: './quem-somos.scss',
})
export class QuemSomosComponent implements OnInit{
  private teamService = inject(TeamService);

  teamMembers = signal<TeamMember[]>([]);
  isLoading = signal<boolean>(true);

  ngOnInit(): void {
    this.loadTeam();
  }

  async loadTeam(): Promise<void> {
    this.isLoading.set(true);
    const members = await this.teamService.getActiveTeamMembers();
    this.teamMembers.set(members);
    this.isLoading.set(false);
  }
}
