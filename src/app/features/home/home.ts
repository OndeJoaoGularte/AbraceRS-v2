import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeroComponent } from "./components/hero/hero";

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterModule, HeroComponent],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class HomeComponent {

}
