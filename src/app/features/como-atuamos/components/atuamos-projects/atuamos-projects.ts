import { Component, effect, OnDestroy, OnInit, signal } from '@angular/core';
import { debounceTime, distinctUntilChanged, Subject, Subscription } from 'rxjs';
import { ProjectsService } from '../../../../core/services/projects/projects';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../../core/services/auth/auth';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-atuamos-projects',
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './atuamos-projects.html',
  styleUrl: './atuamos-projects.scss',
})
export class AtuamosProjectsComponent implements OnInit, OnDestroy {
  projects = signal<any[]>([]);
  loading = signal<boolean>(true);
  searchTool: string = '';

  filterActive: 'all' | boolean = 'all';
  presentOrdination: string = 'name-asc';

  private searchSubject = new Subject<string>();
  private searchSubscription!: Subscription;

  constructor(
    private projectsService: ProjectsService,
    private router: Router,
    public authService: AuthService
  ) {
    effect(() => {
      this.authService.currentUser(); 
      
      this.loadProjects(); 
    });
  }

  ngOnInit(): void {
    this.searchSubscription = this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(term => {
      this.searchTool = term;
      this.loadProjects();
    });
  }

  ngOnDestroy(): void {
    this.searchSubscription.unsubscribe();
  }

  onSearchInput(term: string): void {
    this.searchSubject.next(term);
  }

 async loadProjects(): Promise<void> {
    this.loading.set(true);
    const isAdmin = this.authService.isLoggedIn();
    
    try {
      const data = await this.projectsService.getProjects(
        this.filterActive,
        this.presentOrdination,
        this.searchTool,
        isAdmin
      );
      this.projects.set(data);
    } catch (error) {
      console.error("Erro ao carregar projetos:", error);
    } finally {
      this.loading.set(false);
    }
  }

  filterByActive(active: 'all' | boolean): void {
    this.filterActive = active;
    this.loadProjects();
  }

  showDetails(id: number): void {
    this.router.navigate(['/project', id]);
  }

  async deleteProject(id: number, event: MouseEvent): Promise<void> {
    event.stopPropagation();
    if (confirm('Tem certeza que deseja deletar este projeto? Esta ação não pode ser desfeita.')) {
      const { error } = await this.projectsService.deleteProject(id);
      if (!error) {
        this.projects.update(projs => projs.filter(p => p.id !== id));
      } else {
        alert('Ocorreu um erro ao deletar o projeto.');
      }
    }
  }
}