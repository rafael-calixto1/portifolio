import { Component, DestroyRef, ElementRef, effect, inject, viewChild } from '@angular/core';
import Typewriter from 'typewriter-effect/dist/core';
import { Social } from '../components/social';
import { Spinner } from '../components/spinner';
import { HomeData } from '../core/models';
import { ProfileData } from '../core/profile-data';

@Component({
  selector: 'app-home',
  imports: [Social, Spinner],
  template: `
    @if (data(); as d) {
      <section class="home">
        <h1 class="name">{{ d.name }}</h1>
        <p class="roles">I'm <span #typewriter class="Typewriter"></span></p>
        <app-social />
      </section>
    } @else {
      <app-spinner />
    }
  `,
  styles: `
    :host { flex: 1; }
    .home {
      flex: 1; height: 100%; min-height: calc(100dvh - var(--nav-h) - 4rem);
      display: flex; flex-direction: column; justify-content: center; align-items: center; padding: 0 1rem;
    }
    .name {
      margin: 0;
      font-size: clamp(3rem, 11vw, 6.5rem);
      font-weight: 750;
      line-height: 1;
      letter-spacing: -0.045em;
    }
    .roles {
      margin: 1.25rem 0 0;
      min-height: 1.3em;
      font-size: clamp(1.375rem, 3.5vw, 2rem);
      font-weight: 600;
      letter-spacing: -0.02em;
      color: var(--fg-secondary);
    }
  `,
})
export class Home {
  protected readonly data = inject(ProfileData).load<HomeData>('home');
  private readonly el = viewChild<ElementRef<HTMLElement>>('typewriter');

  constructor() {
    let instance: Typewriter | undefined;
    effect(() => {
      const host = this.el()?.nativeElement;
      const roles = this.data()?.roles;
      if (!host || !roles) return;
      if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
        host.textContent = roles[0] ?? '';
        return;
      }
      instance = new Typewriter(host, { loop: true, autoStart: true, strings: roles });
    });
    inject(DestroyRef).onDestroy(() => instance?.stop());
  }
}
