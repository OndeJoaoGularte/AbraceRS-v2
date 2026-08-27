import { Component, inject, OnInit, signal } from '@angular/core';
import { BlogFeaturedComponent } from './components/blog-featured/blog-featured';
import { BlogPostsComponent } from './components/blog-posts/blog-posts';
import { PostsService } from '../../core/services/posts/posts';
import { AuthService } from '../../core/services/auth/auth';

@Component({
  selector: 'app-blog',
  imports: [BlogFeaturedComponent, BlogPostsComponent],
  templateUrl: './blog.html',
  styleUrl: './blog.scss',
})
export class BlogComponent implements OnInit {
  private postsService = inject(PostsService);
  private authService = inject(AuthService);

  featuredPost = signal<any>(null);
  isLoading = signal<boolean>(true);

  async ngOnInit(): Promise<void> {
    const isUserAdmin = this.authService.isLoggedIn();
    
    const allPosts = await this.postsService.getPosts('published_at-desc', '', isUserAdmin);

    if (allPosts && allPosts.length > 0) {
      this.featuredPost.set(allPosts[0]);
    }

    this.isLoading.set(false);
  }
}