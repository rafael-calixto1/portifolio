import { Component, ElementRef, inject, input, signal, viewChild } from '@angular/core';
import { Header } from '../components/header';
import { Spinner } from '../components/spinner';
import { MarkdownPipe } from '../core/markdown';
import { Skill, SkillsData } from '../core/models';
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
          <p class="hint"><i class="bi bi-hand-index" aria-hidden="true"></i> Click a highlighted skill to see what I master and where I used it.</p>
          @for (group of d.skills; track group.title) {
            <section class="group">
              <h3 class="group-title">{{ group.title }}</h3>
              <div class="grid">
                @for (item of group.items; track item.title) {
                  @if (item.details) {
                    <button type="button" class="skill pressable has-details" (click)="open(item)"
                      [attr.aria-label]="item.title + ': see details'">
                      <span class="badge-dot" aria-hidden="true"></span>
                      <img [src]="item.icon" [class.mono]="item.mono" alt="" loading="lazy" />
                      <span>{{ item.title }}</span>
                    </button>
                  } @else {
                    <div class="skill">
                      <img [src]="item.icon" [class.mono]="item.mono" alt="" loading="lazy" />
                      <span>{{ item.title }}</span>
                    </div>
                  }
                }
              </div>
            </section>
          }
        </div>
      </div>
    } @else {
      <app-spinner />
    }

    <dialog #dialog class="sheet" (click)="onBackdrop($event)" (close)="selected.set(null)" aria-labelledby="skill-title">
      @if (selected(); as s) {
        <div class="sheet-body">
          <header class="sheet-head">
            <img [src]="s.icon" [class.mono]="s.mono" alt="" />
            <h3 id="skill-title">{{ s.title }}</h3>
            <button type="button" class="close" (click)="close()" aria-label="Close">
              <i class="bi bi-x-lg" aria-hidden="true"></i>
            </button>
          </header>
          <h4 class="label">What I master</h4>
          <p class="summary">{{ s.details?.summary }}</p>
          <h4 class="label">Where I used it</h4>
          <ul class="projects">
            @for (p of s.details?.projects; track p.name) {
              <li>
                <i class="bi bi-folder2-open" aria-hidden="true"></i>
                <div>
                  <strong>{{ p.name }}</strong>
                  <p>{{ p.text }}</p>
                </div>
              </li>
            }
          </ul>
        </div>
      }
    </dialog>
  `,
  styles: `
    .container { max-width: 60rem; }
    .intro { white-space: pre-wrap; color: var(--fg-secondary); font-size: 1.1875rem; font-weight: 400; line-height: 1.5; letter-spacing: -0.01em; }
    .intro :is(p) { margin: 0; }
    .hint { margin: 1rem 0 0; color: var(--fg-secondary); font-size: 0.9rem; }
    .hint i { color: var(--accent); }
    .group { margin-top: 3rem; }
    .group-title { font-size: 1.5rem; margin-bottom: 1.25rem; }
    .grid { display: grid; grid-template-columns: repeat(auto-fit, 6.5rem); justify-content: center; gap: 0.75rem; }
    .skill {
      position: relative; display: flex; flex-direction: column; align-items: center; gap: 0.6rem; padding: 1rem 0.5rem 0.85rem;
      border-radius: var(--radius-md); background: var(--surface); border: 1px solid var(--surface-border);
      box-shadow: var(--shadow-sm); font-size: 0.8125rem; font-weight: 550; letter-spacing: 0; color: var(--fg);
    }
    button.skill { font: inherit; font-size: 0.8125rem; font-weight: 550; cursor: pointer; }
    .has-details { border-color: color-mix(in srgb, var(--accent) 45%, var(--surface-border)); }
    .has-details:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }
    .badge-dot { position: absolute; top: 0.5rem; right: 0.5rem; width: 0.45rem; height: 0.45rem; border-radius: 50%; background: var(--accent); }
    @media (hover: hover) { .has-details:hover { transform: translateY(-3px); box-shadow: var(--shadow-lg); } }
    .skill img { width: 2.75rem; height: 2.75rem; object-fit: contain; }
    :host-context([data-theme='dark']) img.mono { filter: invert(1); }

    .sheet {
      width: min(36rem, calc(100vw - 2rem)); max-height: min(85vh, 44rem); padding: 0; border: 1px solid var(--surface-border);
      border-radius: var(--radius-lg); background: var(--surface); color: var(--fg); box-shadow: var(--shadow-lg);
    }
    .sheet[open] { animation: pop 0.28s var(--ease-spring); }
    .sheet::backdrop { background: rgba(0, 0, 0, 0.45); backdrop-filter: blur(4px); }
    @keyframes pop { from { opacity: 0; transform: translateY(12px) scale(0.98); } to { opacity: 1; transform: none; } }
    .sheet-body { padding: 1.5rem; text-align: left; }
    .sheet-head { display: flex; align-items: center; gap: 0.85rem; margin-bottom: 1.25rem; }
    .sheet-head img { width: 2.5rem; height: 2.5rem; object-fit: contain; }
    .sheet-head h3 { margin: 0; font-size: 1.4rem; font-weight: 700; flex: 1; }
    .close {
      display: inline-flex; align-items: center; justify-content: center; width: 2.25rem; height: 2.25rem;
      border: 0; border-radius: 50%; background: var(--fill); color: var(--fg); cursor: pointer;
    }
    .close:hover { background: var(--fill-strong); }
    .label { margin: 0 0 0.5rem; font-size: 0.75rem; font-weight: 600; letter-spacing: 0.06em; text-transform: uppercase; color: var(--accent); }
    .summary { margin: 0 0 1.5rem; font-size: 1rem; line-height: 1.6; color: var(--fg-secondary); }
    .projects { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 0.75rem; }
    .projects li { display: flex; gap: 0.75rem; padding: 0.9rem 1rem; border-radius: var(--radius-md); background: var(--fill); }
    .projects i { color: var(--accent); font-size: 1.1rem; margin-top: 0.1rem; }
    .projects strong { display: block; font-size: 0.95rem; color: var(--fg); }
    .projects p { margin: 0.2rem 0 0; font-size: 0.9rem; line-height: 1.5; color: var(--fg-secondary); }

    @media (prefers-reduced-motion: reduce) { .sheet[open] { animation: none; } }
  `,
})
export class Skills {
  readonly header = input<string>();
  protected readonly data = inject(ProfileData).load<SkillsData>('skills');
  protected readonly selected = signal<Skill | null>(null);
  private readonly dialog = viewChild.required<ElementRef<HTMLDialogElement>>('dialog');

  protected open(skill: Skill) {
    this.selected.set(skill);
    this.dialog().nativeElement.showModal();
  }

  protected close() {
    this.dialog().nativeElement.close();
  }

  protected onBackdrop(event: MouseEvent) {
    if (event.target === this.dialog().nativeElement) this.close();
  }
}
