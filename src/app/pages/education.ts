import { Component, inject, input } from '@angular/core';
import { Header } from '../components/header';
import { Spinner } from '../components/spinner';
import { EducationData } from '../core/models';
import { ProfileData } from '../core/profile-data';

@Component({
  selector: 'app-education',
  imports: [Header, Spinner],
  template: `
    <app-header [title]="header() ?? 'Education'" />
    @if (data(); as d) {
      <div class="section-content-container">
        <div class="container timeline">
          @for (item of d.education; track item.title) {
            <div class="timeline-item">
              <div class="timeline-dot">
                @if (item.icon; as icon) {
                  <img [src]="icon.src" [alt]="icon.alt ?? item.cardTitle" />
                }
              </div>
              <div class="timeline-card">
                <div class="timeline-date">{{ item.title }}</div>
                <h3 class="timeline-title">{{ item.cardTitle }}</h3>
                <h5 class="timeline-subtitle">{{ item.cardSubtitle }}</h5>
                <p class="timeline-text">{{ item.cardDetailedText }}</p>
              </div>
            </div>
          }
        </div>
      </div>
    } @else {
      <app-spinner />
    }
  `,
})
export class Education {
  readonly header = input<string>();
  protected readonly data = inject(ProfileData).load<EducationData>('education');
}
