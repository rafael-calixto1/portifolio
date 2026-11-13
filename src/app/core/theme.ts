import { Injectable, effect, signal } from '@angular/core';

const STORAGE_KEY = 'darkMode';

@Injectable({ providedIn: 'root' })
export class Theme {
  readonly dark = signal(this.read());

  constructor() {
    effect(() => {
      const dark = this.dark();
      document.documentElement.dataset['theme'] = dark ? 'dark' : 'light';
      document.documentElement.dataset['bsTheme'] = dark ? 'dark' : 'light';
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(dark));
      } catch {
        /* storage unavailable */
      }
    });
  }

  toggle() {
    this.dark.update((v) => !v);
  }

  private read(): boolean {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored !== null) return JSON.parse(stored) === true;
    } catch {
      /* ignore */
    }
    return true; // dark by default, as before
  }
}
