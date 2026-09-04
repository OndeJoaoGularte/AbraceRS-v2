import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProjectsService } from '../../../core/services/projects/projects';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { CommonModule, Location } from '@angular/common';
import { CustomGalleryComponent } from '../../../shared/components/custom-gallery/custom-gallery';

@Component({
  selector: 'app-project-detail',
  imports: [CommonModule, CustomGalleryComponent, RouterLink],
  templateUrl: './project-detail.html',
  styleUrl: './project-detail.scss',
})
export class ProjectDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private projectsService = inject(ProjectsService);
  private sanitizer = inject(DomSanitizer);
  private location = inject(Location);

  project = signal<any>(null);
  isLoading = signal<boolean>(true);
  safeHtmlContent = signal<SafeHtml | null>(null);

  async ngOnInit(): Promise<void> {
    const id = this.route.snapshot.paramMap.get('id');
    
    if (id) {
      const fetchedProject = await this.projectsService.getProjectById(Number(id));
      
      if (fetchedProject) {
        this.project.set(fetchedProject);

        if (fetchedProject.content) {
          const cleanHtml = fetchedProject.content.replace(/&nbsp;/g, ' ');
          this.safeHtmlContent.set(this.sanitizer.bypassSecurityTrustHtml(cleanHtml));
        }
      }
    }
    
    this.isLoading.set(false);
  }

  goBack(): void {
    this.location.back();
  }
}