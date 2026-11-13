import { NgTemplateOutlet } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NavbarData } from '../core/models';
import { ProfileData } from '../core/profile-data';
import { ThemeToggler } from './theme-toggler';

@Component({
  selector: 'app-navbar',
  imports: [NgTemplateOutlet, RouterLink, RouterLinkActive, ThemeToggler],
  host: { '(document:keydown.escape)': 'expanded.set(false)' },
  template: `
    <nav class="site-nav" [class.open]="expanded()" aria-label="Main">
      <div class="bar">
        <a class="brand pressable" routerLink="/" (click)="expanded.set(false)">
          @if (data()?.logo; as logo) {
            <img [src]="logo.source" alt="Home"
                 [style.height.px]="(logo.height ?? 40) * 0.7" [style.width.px]="(logo.width ?? 50) * 0.7" />
          }
        </a>

        <div class="links desktop">
          <ng-container *ngTemplateOutlet="links" />
        </div>

        <div class="end">
          <app-theme-toggler (toggled)="expanded.set(false)" />
          <button type="button" class="menu-btn pressable" aria-controls="mobile-menu"
                  [attr.aria-expanded]="expanded()" [attr.aria-label]="expanded() ? 'Close menu' : 'Open menu'"
                  (click)="expanded.set(!expanded())">
            <span></span><span></span>
          </button>
        </div>
      </div>

      <div class="sheet" id="mobile-menu" [attr.inert]="expanded() ? null : ''">
        <div class="sheet-inner">
          <div class="links mobile">
            <ng-container *ngTemplateOutlet="links" />
          </div>
        </div>
      </div>
    </nav>

    <ng-template #links>
      @for (section of data()?.sections; track section.title) {
        @if (section.type === 'link') {
          <a class="link pressable" [href]="section.href" target="_blank" rel="noopener noreferrer"
             (click)="expanded.set(false)">{{ section.title }} <span aria-hidden="true" class="ext">↗</span></a>
        } @else {
          <a class="link pressable" [routerLink]="section.href" routerLinkActive="active" ariaCurrentWhenActive="page"
             [routerLinkActiveOptions]="{ exact: section.href === '/' }"
             (click)="expanded.set(false)">{{ section.title }}</a>
        }
      }
    </ng-template>
  `,
  styles: `
    :host { position: fixed; inset: 0 0 auto; z-index: 1030; }

    /* Translucent material: content scrolls underneath */
    .site-nav {
      background: var(--material);
      -webkit-backdrop-filter: blur(20px) saturate(180%);
      backdrop-filter: blur(20px) saturate(180%);
      box-shadow: 0 1px 0 var(--material-edge);
    }
    .bar {
      display: flex; align-items: center; gap: 1rem;
      height: var(--nav-h); max-width: 70rem; margin: 0 auto; padding: 0 1rem;
    }
    .brand { display: flex; align-items: center; border-radius: 8px; }
    .end { margin-left: auto; display: flex; align-items: center; gap: 0.5rem; }

    .links { display: flex; align-items: center; gap: 0.25rem; }
    .links.desktop { margin-left: auto; }
    .link {
      position: relative;
      padding: 0.35rem 0.75rem;
      border-radius: 999px;
      color: var(--fg-secondary);
      font-size: 0.875rem;
      font-weight: 500;
      letter-spacing: 0;
      text-decoration: none;
    }
    .link:hover { color: var(--fg); background: var(--fill); }
    .link.active { color: var(--fg); background: var(--fill-strong); }
    .ext { font-size: 0.75em; opacity: 0.6; }

    /* Hamburger → close, morphs in place */
    .menu-btn {
      display: none; position: relative; width: 2.5rem; height: 2.5rem;
      border: 0; border-radius: 999px; background: transparent; cursor: pointer;
    }
    .menu-btn:hover { background: var(--fill); }
    .menu-btn span {
      position: absolute; left: 0.75rem; right: 0.75rem; height: 2px; border-radius: 2px; background: var(--fg);
      transition: transform 0.35s var(--ease-spring);
    }
    .menu-btn span:first-child { transform: translateY(-4px); }
    .menu-btn span:last-child { transform: translateY(4px); }
    .open .menu-btn span:first-child { transform: rotate(45deg); }
    .open .menu-btn span:last-child { transform: rotate(-45deg); }

    /* Mobile sheet: grows down from the bar and retracts along the same path */
    .sheet { display: grid; grid-template-rows: 0fr; transition: grid-template-rows 0.4s var(--ease-spring); }
    .sheet-inner { overflow: hidden; }
    .open .sheet { grid-template-rows: 1fr; }
    .links.mobile {
      flex-direction: column; align-items: stretch; gap: 0.125rem; padding: 0.25rem 1rem 1rem;
      opacity: 0; transform: translateY(-6px);
      transition: opacity 0.25s var(--ease-out), transform 0.4s var(--ease-spring);
    }
    .open .links.mobile { opacity: 1; transform: none; }
    .links.mobile .link { font-size: 1.0625rem; padding: 0.7rem 1rem; border-radius: var(--radius-md); text-align: left; }

    @media (max-width: 767.98px) {
      .links.desktop { display: none; }
      .menu-btn { display: inline-block; }
    }
    @media (min-width: 768px) {
      .sheet { display: none; }
    }
  `,
})
export class NavBar {
  protected readonly data = inject(ProfileData).load<NavbarData>('navbar');
  protected readonly expanded = signal(false);
}
