import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TeamMember, TeamService } from '../../../../core/services/team/team';

@Component({
  selector: 'app-team-list',
  imports: [CommonModule, RouterModule],
  templateUrl: './team-list.html',
  styleUrl: './team-list.scss',
})
export class TeamListComponent implements OnInit {
  private teamService = inject(TeamService);

  members = signal<TeamMember[]>([]);
  isLoading = signal(true);

  ngOnInit(): void {
    this.loadMembers();
  }

  async loadMembers(): Promise<void> {
    this.isLoading.set(true);
    const data = await this.teamService.getAllTeamMembers();
    this.members.set(data);
    this.isLoading.set(false);
  }

  async deleteMember(id: number | undefined, event: MouseEvent): Promise<void> {
    event.preventDefault();
    event.stopPropagation();

    if (!id || !confirm('Tem certeza que deseja remover este membro da equipe?')) {
      return;
    }

    const { error } = await this.teamService.deleteTeamMember(id);
    if (error) {
      alert('Não foi possível remover o membro.');
      return;
    }

    await this.loadMembers();
  }

  async reactivateMember(id: number | undefined, event: MouseEvent): Promise<void> {
    event.preventDefault();
    event.stopPropagation();

    if (!id) return;

    const { error } = await this.teamService.updateTeamMember(id, { active: true });
    if (error) {
      alert('Não foi possível reativar o membro.');
      return;
    }

    await this.loadMembers();
  }
}
