import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ProjectsService } from '../../core/services/projects/projects';
//import { Posts } from '../../services/posts/posts';
import { AuthService } from '../../core/services/auth/auth';

import { HeroComponent } from './components/hero/hero';
//import { AboutComponent } from './components/about/about';
//import { ProjectsComponent } from './components/projects/projects';
//import { AssociateComponent } from './components/associate/associate';
//import { SupportersComponent } from './components/supporters/supporters';
//import { DonateComponent } from './components/donate/donate';
//import { PostsComponent } from './components/posts/posts';

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterModule, HeroComponent],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class HomeComponent implements OnInit {
  private projectsService = inject(ProjectsService);
  //private postsService = inject(Posts);
  private authService = inject(AuthService);

  isLoading = signal<boolean>(true);
  featuredProject = signal<any>(null);
  secondaryProjects = signal<any[]>([]);

  latestPosts = signal<any[]>([]);
  allPostsLoaded = signal<boolean>(false);
  private currentPage = 0;
  private postsPerPage = 3;
  private totalPosts = 0;

  ngOnInit(): void {
    this.loadInitialData();
  }

  async loadInitialData(): Promise<void> {
    this.isLoading.set(true);

    const [projects] = await Promise.all([
      this.projectsService.getLatestProjects(3),
      this.loadMorePosts(),
    ]);

    if (projects && projects.length > 0) {
      this.featuredProject.set(projects[0]);
      this.secondaryProjects.set(projects.slice(1));
    }

    this.isLoading.set(false);
  }

  async loadMorePosts(): Promise<void> {
    const isUserAdmin = this.authService.isLoggedIn();
    //const { data, count } = await this.postsService.getPaginatedPosts(
    //  this.currentPage,
    //  this.postsPerPage,
    //  isUserAdmin,
    //);

    //this.latestPosts.update((posts) => [...posts, ...data]);
    //this.totalPosts = count;
    //this.currentPage++;

    if (this.latestPosts().length >= this.totalPosts) {
      this.allPostsLoaded.set(true);
    }
  }
}
