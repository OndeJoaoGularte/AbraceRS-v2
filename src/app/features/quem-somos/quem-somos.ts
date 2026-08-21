import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IntroComponent } from './components/intro/intro';
import { MissionComponent } from './components/mission/mission';
import { TeamComponent } from './components/team/team';
import { TransparencyComponent } from './components/transparency/transparency';
import { TeamMember, TeamService } from '../../core/services/team/team';

@Component({
  selector: 'app-quem-somos',
  imports: [
    CommonModule,
    RouterModule,
    IntroComponent,
    MissionComponent,
    TeamComponent,
    TransparencyComponent,
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
