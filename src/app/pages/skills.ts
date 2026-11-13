import { Component, inject, input } from '@angular/core';
import { Header } from '../components/header';
import { Spinner } from '../components/spinner';
import { MarkdownPipe } from '../core/markdown';
import { SkillsData } from '../core/models';
import { ProfileData } from '../core/profile-data';

@Component({
  selector: 'app-skills',
  imports: [Header, Spinner, MarkdownPipe],
  template: `
    <app-header [title]="header() ?? 'Skills'" />
    @if (data(); as d) {
      <div class="section-content-container">
        <div class="container">
          <h4 class="intro" [innerHTML]="d.intro | markdown"></h4>
          @for (group of d.skills; track group.title) {
            <section class="group">
              <h3 class="group-title">{{ group.title }}</h3>
              <div class="grid">
                @for (item of group.items; track item.title) {
                  <div class="skill pressable">
                    <img [src]="item.icon" [class.mono]="item.mono" alt="" loading="lazy" />
                    <span>{{ item.title }}</span>
                  </div>
                }
              </div>
            </section>
          }
        </div>
      </div>
    } @else {
      <app-spinner />
    }
  `,
  styles: `
    .container { max-width: 60rem; }
    .intro { white-space: pre-wrap; color: var(--fg-secondary); font-size: 1.1875rem; font-weight: 400; line-height: 1.5; letter-spacing: -0.01em; }
    .intro :is(p) { margin: 0; }
    .group { margin-top: 3rem; }
    .group-title { font-size: 1.5rem; margin-bottom: 1.25rem; }
    .grid { display: grid; grid-template-columns: repeat(auto-fit, 6.5rem); justify-content: center; gap: 0.75rem; }
    .skill {
      display: flex; flex-direction: column; align-items: center; gap: 0.6rem; padding: 1rem 0.5rem 0.85rem;
      border-radius: var(--radius-md); background: var(--surface); border: 1px solid var(--surface-border);
      box-shadow: var(--shadow-sm); font-size: 0.8125rem; font-weight: 550; letter-spacing: 0;
    }
    @media (hover: hover) { .skill:hover { transform: translateY(-3px); box-shadow: var(--shadow-lg); } }
    .skill img { width: 2.75rem; height: 2.75rem; object-fit: contain; }
    :host-context([data-theme='dark']) .skill img.mono { filter: invert(1); }
  `,
})
export class Skills {
  readonly header = input<string>();
  protected readonly data = inject(ProfileData).load<SkillsData>('skills');
}
