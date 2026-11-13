import { Component, inject, input } from '@angular/core';
import { Header } from '../components/header';
import { Spinner } from '../components/spinner';
import { MarkdownPipe } from '../core/markdown';
import { AboutData } from '../core/models';
import { ProfileData } from '../core/profile-data';

@Component({
  selector: 'app-about',
  imports: [Header, Spinner, MarkdownPipe],
  template: `
    <app-header [title]="header() ?? 'About'" />
    <div class="section-content-container">
      <div class="container">
        @if (data(); as d) {
          <div class="row">
            <div class="col-12 col-md-7 about-text" [innerHTML]="d.about | markdown"></div>
            <div class="col-12 col-md-5 about-image order-first order-md-last"><img [src]="d.imageSource" alt="profile" /></div>
          </div>
        } @else {
          <app-spinner />
        }
      </div>
    </div>
  `,
  styles: `
    .container { max-width: 64rem; }
    .row { align-items: center; row-gap: 2rem; }
    .about-text { white-space: pre-wrap; text-align: left; font-size: 1.0625rem; line-height: 1.6; color: var(--fg-secondary); }
    .about-text :is(strong) { color: var(--fg); }
    .about-image { display: flex; justify-content: center; }
    .about-image img { width: min(100%, 22rem); border-radius: 1.75rem; box-shadow: var(--shadow-lg); }
  `,
})
export class About {
  readonly header = input<string>();
  protected readonly data = inject(ProfileData).load<AboutData>('about');
}
