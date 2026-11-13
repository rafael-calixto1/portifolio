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
          <section class="intro">
            <div class="intro-text">
              @if (d.status) {
                <span class="status"><span class="dot"></span>{{ d.status }}</span>
              }
              @if (d.headline) {
                <h2 class="headline">{{ d.headline }}</h2>
              }
              <div class="about-text" [innerHTML]="d.about | markdown"></div>
              @if (d.location) {
                <p class="location"><i class="bi bi-geo-alt" aria-hidden="true"></i> {{ d.location }}</p>
              }
            </div>
            @if (d.imageSource) {
              <div class="photo"><img [src]="d.imageSource" alt="Profile photo" /></div>
            }
          </section>

          @if (d.stats?.length) {
            <section class="stats">
              @for (s of d.stats; track s.label) {
                <div class="stat">
                  <span class="stat-value">{{ s.value }}</span>
                  <span class="stat-label">{{ s.label }}</span>
                </div>
              }
            </section>
          }

          @if (d.highlights?.length) {
            <h3 class="section-title">What I build</h3>
            <section class="highlights">
              @for (h of d.highlights; track h.title) {
                <article class="card">
                  <span class="card-icon"><i [class]="'bi bi-' + h.icon" aria-hidden="true"></i></span>
                  <h4>{{ h.title }}</h4>
                  <div class="card-text" [innerHTML]="h.text | markdown"></div>
                </article>
              }
            </section>
          }

          @if (d.focus?.length) {
            <h3 class="section-title">Currently focused on</h3>
            <ul class="focus">
              @for (f of d.focus; track f) {
                <li>{{ f }}</li>
              }
            </ul>
          }
        } @else {
          <app-spinner />
        }
      </div>
    </div>
  `,
  styles: `
    .container { max-width: 64rem; text-align: left; }

    .intro { display: grid; grid-template-columns: 1fr; gap: 2rem; align-items: center; }
    @media (min-width: 768px) { .intro { grid-template-columns: 7fr 5fr; gap: 3rem; } }
    .photo { display: flex; justify-content: center; order: -1; }
    @media (min-width: 768px) { .photo { order: 0; } }
    .photo img {
      width: min(100%, 20rem); aspect-ratio: 1; object-fit: cover; border-radius: 1.75rem;
      box-shadow: var(--shadow-lg); outline: 1px solid var(--surface-border); outline-offset: 6px;
    }

    .status {
      display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.3rem 0.8rem;
      border-radius: 999px; background: var(--fill); color: var(--fg); font-size: 0.85rem; font-weight: 500;
    }
    .dot { width: 0.5rem; height: 0.5rem; border-radius: 50%; background: #30d158; box-shadow: 0 0 0 3px rgba(48, 209, 88, 0.25); }
    .headline { margin: 1rem 0 0.75rem; font-size: clamp(1.6rem, 3.5vw, 2.25rem); font-weight: 700; line-height: 1.15; letter-spacing: -0.02em; color: var(--fg); }
    .about-text { font-size: 1.0625rem; line-height: 1.65; color: var(--fg-secondary); }
    .about-text :is(p) { margin-bottom: 0.9rem; }
    .about-text :is(strong) { color: var(--fg); }
    .location { margin: 0.25rem 0 0; color: var(--fg-secondary); font-size: 0.95rem; }

    .stats { display: grid; grid-template-columns: repeat(2, 1fr); gap: 0.75rem; margin: 3rem 0; }
    @media (min-width: 768px) { .stats { grid-template-columns: repeat(4, 1fr); } }
    .stat {
      display: flex; flex-direction: column; gap: 0.25rem; padding: 1.25rem 1rem; border-radius: var(--radius-lg);
      background: var(--surface); border: 1px solid var(--surface-border); box-shadow: var(--shadow-sm);
    }
    .stat-value { font-size: 1.9rem; font-weight: 700; letter-spacing: -0.02em; color: var(--accent); line-height: 1; }
    .stat-label { font-size: 0.875rem; color: var(--fg-secondary); line-height: 1.35; }

    .section-title { font-size: 1.25rem; font-weight: 600; margin: 0 0 1rem; color: var(--fg); }

    .highlights { display: grid; grid-template-columns: 1fr; gap: 1rem; margin-bottom: 3rem; }
    @media (min-width: 768px) { .highlights { grid-template-columns: repeat(2, 1fr); } }
    .card {
      padding: 1.5rem; border-radius: var(--radius-lg); background: var(--surface);
      border: 1px solid var(--surface-border); box-shadow: var(--shadow-sm);
      transition: transform 0.3s var(--ease-spring), box-shadow 0.3s var(--ease-spring);
    }
    .card:hover { transform: translateY(-3px); box-shadow: var(--shadow-lg); }
    .card-icon {
      display: inline-flex; align-items: center; justify-content: center; width: 2.75rem; height: 2.75rem;
      margin-bottom: 0.9rem; border-radius: var(--radius-md); background: var(--fill); color: var(--accent); font-size: 1.3rem;
    }
    .location i { color: var(--accent); }
    .card h4 { font-size: 1.05rem; font-weight: 600; margin: 0 0 0.4rem; color: var(--fg); }
    .card-text { font-size: 0.95rem; line-height: 1.55; color: var(--fg-secondary); }
    .card-text :is(p) { margin: 0; }
    .card-text :is(strong) { color: var(--fg); }

    .focus { display: flex; flex-wrap: wrap; gap: 0.5rem; padding: 0; margin: 0 0 1rem; list-style: none; }
    .focus li { padding: 0.45rem 0.9rem; border-radius: 999px; background: var(--fill); color: var(--fg); font-size: 0.9rem; }

    @media (prefers-reduced-motion: reduce) { .card, .card:hover { transition: none; transform: none; } }
  `,
})
export class About {
  readonly header = input<string>();
  protected readonly data = inject(ProfileData).load<AboutData>('about');
}
