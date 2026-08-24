import { Component } from '@angular/core';
import { AtuamosFrontsComponent } from './components/atuamos-fronts/atuamos-fronts';
import { AtuamosTimelineComponent } from './components/atuamos-timeline/atuamos-timeline';
import { AtuamosProjectsComponent } from './components/atuamos-projects/atuamos-projects';

@Component({
  selector: 'app-como-atuamos',
  imports: [AtuamosFrontsComponent, AtuamosTimelineComponent, AtuamosProjectsComponent],
  templateUrl: './como-atuamos.html',
  styleUrl: './como-atuamos.scss',
})
export class ComoAtuamosComponent {}
