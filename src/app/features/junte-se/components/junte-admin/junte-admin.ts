import { Component, inject, OnInit, output, signal } from '@angular/core';
import { AssociateData, MembershipService, VolunteerData } from '../../../../core/services/membership/membership';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-junte-admin',
  imports: [CommonModule, DatePipe],
  templateUrl: './junte-admin.html',
  styleUrl: './junte-admin.scss',
})
export class JunteAdminComponent implements OnInit {
  private membershipService = inject(MembershipService);

  onBack = output<void>();

  activeTab = signal<'associates' | 'volunteers'>('associates');
  associatesList = signal<AssociateData[]>([]);
  volunteersList = signal<VolunteerData[]>([]);
  
  isLoading = signal<boolean>(true);
  expandedId = signal<number | null>(null);

  async ngOnInit(): Promise<void> {
    await this.fetchData();
  }

  async fetchData(): Promise<void> {
    this.isLoading.set(true);

    const [associates, volunteers] = await Promise.all([
      this.membershipService.getAssociates(),
      this.membershipService.getVolunteers()
    ]);

    this.associatesList.set(associates);
    this.volunteersList.set(volunteers);
    
    this.isLoading.set(false);
  }

  changeTab(tab: 'associates' | 'volunteers'): void {
    this.activeTab.set(tab);
    this.expandedId.set(null);
  }

  toggleAccordion(id: number | undefined): void {
    if (!id) return;
    
    if (this.expandedId() === id) {
      this.expandedId.set(null);
    } else {
      this.expandedId.set(id);
    }
  }

  goBack(): void {
    this.onBack.emit();
  }
}