import { DatePipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-blog-featured',
  imports: [RouterModule, DatePipe],
  templateUrl: './blog-featured.html',
  styleUrl: './blog-featured.scss',
})
export class BlogFeaturedComponent {
  post = input<any>(null);
  isLoading = input<boolean>(true);
}
