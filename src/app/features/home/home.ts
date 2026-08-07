import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ProjectsService } from '../../core/services/projects/projects';
//import { Posts } from '../../services/posts/posts';
import { SupportersService } from '../../core/services/supporters/supporters';
import { AuthService } from '../../core/services/auth/auth';

import { HeroComponent } from './components/hero/hero';
import { AboutComponent } from './components/about/about';
//import { ProjectsComponent } from './components/projects/projects';
import { AssociateComponent } from './components/associate/associate';
import { Supporter, SupportersComponent } from './components/supporters/supporters';
//import { DonateComponent } from './components/donate/donate';
//import { PostsComponent } from './components/posts/posts';

@Component({
  selector: 'app-home',
  imports: [
    CommonModule,
    RouterModule,
    HeroComponent,
    AboutComponent,
    AssociateComponent,
    SupportersComponent,
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class HomeComponent implements OnInit {
  private projectsService = inject(ProjectsService);
  //private postsService = inject(Posts);
  private supportersService = inject(SupportersService);
  private authService = inject(AuthService);

  masterSupporters = signal<Supporter[]>([]);
  standardSupporters = signal<Supporter[]>([]);

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

    const [projects, supporters] = await Promise.all([
      this.projectsService.getLatestProjects(3),
      this.supportersService.getActiveSupporters(),
      this.loadMorePosts(),
    ]);

    if (projects && projects.length > 0) {
      this.featuredProject.set(projects[0]);
      this.secondaryProjects.set(projects.slice(1));
    }

    this.masterSupporters.set(supporters.filter((s) => s.tier === 'master'));
    this.standardSupporters.set(supporters.filter((s) => s.tier === 'standard'));

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
