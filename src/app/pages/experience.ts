import { Component, inject, input } from '@angular/core';
import { Header } from '../components/header';
import { Spinner } from '../components/spinner';
import { MarkdownPipe } from '../core/markdown';
import { ExperienceData } from '../core/models';
import { ProfileData } from '../core/profile-data';

@Component({
  selector: 'app-experience',
  imports: [Header, Spinner, MarkdownPipe],
  template: `
    <app-header [title]="header() ?? 'Experience'" />
    @if (data(); as d) {
      <div class="section-content-container">
        <div class="container timeline">
          @for (item of d.experiences; track item.title + item.dateText) {
            <div class="timeline-item">
              <div class="timeline-dot"></div>
              <div class="timeline-card">
                <div class="timeline-date">{{ item.dateText }}</div>
                <h2 class="timeline-title">{{ item.title }}</h2>
                <div class="my-2">
                  <h4 class="d-inline-block accent">{{ item.subtitle }}</h4>
                  @if (item.workType) {
                    <h5 class="d-inline-block">&nbsp;· {{ item.workType }}</h5>
                  }
                </div>
                <ul class="exp-list">
                  @for (point of item.workDescription; track point) {
                    <li [innerHTML]="point | markdown: true"></li>
                  }
                </ul>
              </div>
            </div>
          }
        </div>
      </div>
    } @else {
      <app-spinner />
    }
  `,
  styles: `
    .exp-list { list-style-position: outside; padding-left: 20px; text-align: left; }
    .exp-list li { margin-bottom: 1em; }
    .accent { color: var(--accent); }
  `,
})
export class Experience {
  readonly header = input<string>();
  protected readonly data = inject(ProfileData).load<ExperienceData>('experiences');
}
