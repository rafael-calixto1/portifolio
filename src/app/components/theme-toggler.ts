import { Component, inject, output } from '@angular/core';
import { Theme } from '../core/theme';

@Component({
  selector: 'app-theme-toggler',
  template: `
    <button type="button" class="switch" role="switch"
            [attr.aria-checked]="theme.dark()" aria-label="Dark mode" (click)="onToggle()">
      <span class="knob" [class.on]="theme.dark()" aria-hidden="true">
        <svg viewBox="0 0 24 24" width="14" height="14">
          @if (theme.dark()) {
            <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
          } @else {
            <circle cx="12" cy="12" r="4.5" />
            <path d="M12 1.5v3M12 19.5v3M4.6 4.6l2.1 2.1M17.3 17.3l2.1 2.1M1.5 12h3M19.5 12h3M4.6 19.4l2.1-2.1M17.3 6.7l2.1-2.1"
                  stroke-width="2" stroke-linecap="round" />
          }
        </svg>
      </span>
    </button>
  `,
  styles: `
    /* iOS-style switch: the knob stretches while pressed, then springs across */
    .switch {
      position: relative; width: 3.25rem; height: 2rem; padding: 0; border: 0; border-radius: 999px; cursor: pointer;
      background: var(--fill-strong);
      transition: background-color 0.3s var(--ease-out);
    }
    .switch[aria-checked='true'] { background: var(--accent); }
    .knob {
      position: absolute; top: 0.1875rem; left: 0.1875rem; width: 1.625rem; height: 1.625rem; border-radius: 999px;
      background: #fff; color: #1d1d1f; display: grid; place-items: center;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2), 0 0 0 0.5px rgba(0, 0, 0, 0.04);
      transition: transform 0.4s var(--ease-spring), width 0.25s var(--ease-spring);
    }
    .knob.on { transform: translateX(1.25rem); }
    .switch:active .knob { width: 1.95rem; }
    .switch:active .knob.on { transform: translateX(0.925rem); }
    svg { fill: currentColor; stroke: currentColor; }
  `,
})
export class ThemeToggler {
  protected readonly theme = inject(Theme);
  readonly toggled = output<void>();

  onToggle() {
    this.theme.toggle();
    this.toggled.emit();
  }
}
