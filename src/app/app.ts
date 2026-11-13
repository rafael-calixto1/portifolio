import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavBar } from './components/navbar';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavBar],
  template: `
    <div class="MainApp">
      <app-navbar />
      <main class="main"><router-outlet /></main>
    </div>
  `,
})
export class App {}
