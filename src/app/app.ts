import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { injectSpeedInsights } from '@vercel/speed-insights';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  protected readonly title = signal('instituto-abrace');

  ngOnInit() {
    injectSpeedInsights({
      framework: 'angular',
    });
  }
}
