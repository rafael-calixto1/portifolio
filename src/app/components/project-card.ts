import { Component, input } from '@angular/core';
import { MarkdownPipe } from '../core/markdown';
import { Project } from '../core/models';

@Component({
  selector: 'app-project-card',
  imports: [MarkdownPipe],
  template: `
    <article class="card project-card pressable h-100">
      @if (project().image) {
        <img class="card-img-top" [src]="project().image" [alt]="project().title" loading="lazy" />
      }
      <div class="card-body">
        <h3 class="card-title project-title">{{ project().title }}</h3>
        <div class="card-text project-text" [innerHTML]="project().bodyText | markdown"></div>
      </div>
      @if (project().links?.length) {
        <div class="card-actions">
          @for (link of project().links; track link.href; let first = $first) {
            <a class="btn-pill pressable" [class.primary]="!first" [href]="link.href"
               target="_blank" rel="noopener noreferrer">{{ link.text }}</a>
          }
        </div>
      }
      @if (project().tags?.length) {
        <div class="card-footer">
          @for (tag of project().tags; track tag) {
            <span class="tag">{{ tag }}</span>
          }
        </div>
      }
    </article>
  `,
})
export class ProjectCard {
  readonly project = input.required<Project>();
}
