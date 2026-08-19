import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IntroComponent } from './components/intro/intro';
import { MissionComponent } from './components/mission/mission';
import { TeamComponent } from './components/team/team';
import { TransparencyComponent } from './components/transparency/transparency';

@Component({
  selector: 'app-quem-somos',
  imports: [
    CommonModule,
    RouterModule,
    IntroComponent,
    MissionComponent,
    TeamComponent,
    TransparencyComponent,
  ],
  templateUrl: './quem-somos.html',
  styleUrl: './quem-somos.scss',
})
export class QuemSomosComponent {}
