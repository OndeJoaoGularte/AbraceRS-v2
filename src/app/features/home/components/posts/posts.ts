import { Component, input, output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-posts',
  imports: [RouterModule, DatePipe],
  templateUrl: './posts.html',
  styleUrl: './posts.scss',
})
export class PostsComponent {
  isLoading = input<boolean>(true);
  posts = input<any[]>([]);
  allLoaded = input<boolean>(false);

  onLoadMore = output<void>();

  loadMore(): void {
    this.onLoadMore.emit();
  }
}
