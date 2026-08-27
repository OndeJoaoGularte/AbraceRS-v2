import { Component, effect, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { PostsService } from '../../../../core/services/posts/posts';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../../core/services/auth/auth';
import { debounceTime, distinctUntilChanged, Subject, Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-blog-posts',
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './blog-posts.html',
  styleUrl: './blog-posts.scss',
})
export class BlogPostsComponent implements OnInit, OnDestroy {
  posts = signal<any[]>([]);
  loading = signal<boolean>(true);
  searchTool: string = '';
  presentOrdination: string = 'published_at-desc';

  private searchSubject = new Subject<string>();
  private searchSubscription!: Subscription;

  constructor(
    private postsService: PostsService,
    private router: Router,
    public authService: AuthService
  ) {
    effect(() => {
      this.authService.currentUser(); 
      
      this.loadPosts(); 
    });
  }

  ngOnInit(): void {
    this.searchSubscription = this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(term => {
      this.searchTool = term;
      this.loadPosts();
    });
  }

  ngOnDestroy(): void {
    this.searchSubscription.unsubscribe();
  }

  onSearchInput(term: string): void {
    this.searchSubject.next(term);
  }

  async loadPosts(): Promise<void> {
    this.loading.set(true);
    const isAdmin = this.authService.isLoggedIn();
    
    try {
      const data = await this.postsService.getPosts(
        this.presentOrdination,
        this.searchTool,
        isAdmin
      );
      this.posts.set(data);
    } catch (error) {
      console.error("Erro ao carregar postagens:", error);
    } finally {
      this.loading.set(false);
    }
  }

  showDetails(id: number): void {
    this.router.navigate(['/post', id]);
  }

  async deletePost(id: number, event: MouseEvent): Promise<void> {
    event.stopPropagation();
    if (confirm('Tem certeza que deseja deletar esta postagem?')) {
      const { error } = await this.postsService.deletePost(id);
      if (!error) {
        this.posts.update(currentPosts => currentPosts.filter(p => p.id !== id));
        alert('Postagem deletada com sucesso!');
      } else {
        alert('Ocorreu um erro ao deletar a postagem.');
      }
    }
  }
}