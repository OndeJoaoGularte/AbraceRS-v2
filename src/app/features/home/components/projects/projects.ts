import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-projects',
  imports: [RouterModule],
  templateUrl: './projects.html',
  styleUrl: './projects.scss',
})
export class ProjectsComponent {
  isLoading = input<boolean>(true);
  featured = input<any>(null);
  secondary = input<any[]>([]);
}
