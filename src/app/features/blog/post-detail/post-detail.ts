import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostsService } from '../../../core/services/posts/posts';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { CommonModule, Location } from '@angular/common';
import { CustomGalleryComponent } from '../../../shared/components/custom-gallery/custom-gallery';

@Component({
  selector: 'app-post-detail',
  imports: [CommonModule, CustomGalleryComponent],
  templateUrl: './post-detail.html',
  styleUrl: './post-detail.scss',
})
export class PostDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private postsService = inject(PostsService);
  private sanitizer = inject(DomSanitizer);
  private location = inject(Location);

  post = signal<any>(null);
  isLoading = signal<boolean>(true);
  safeHtmlContent = signal<SafeHtml | null>(null);

  async ngOnInit(): Promise<void> {
    const id = this.route.snapshot.paramMap.get('id');
    
    if (id) {
      const fetchedPost = await this.postsService.getPostById(Number(id));
      
      if (fetchedPost) {
        this.post.set(fetchedPost);

        if (fetchedPost.content) {
          const cleanHtml = fetchedPost.content.replace(/&nbsp;/g, ' ');
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