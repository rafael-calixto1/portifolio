import { Component, computed, inject, input, signal } from '@angular/core';
import { Header } from '../components/header';
import { ProjectCard } from '../components/project-card';
import { Spinner } from '../components/spinner';
import { ProjectsData } from '../core/models';
import { ProfileData } from '../core/profile-data';

const INITIAL_COUNT = 6;

@Component({
  selector: 'app-projects',
  imports: [Header, ProjectCard, Spinner],
  template: `
    <app-header [title]="header() ?? 'Projects'" />
    @if (data(); as d) {
      <div class="section-content-container">
        <div class="container" style="max-width: 70rem">
          <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 text-start">
            @for (project of visible(); track project.title) {
              <div class="col"><app-project-card [project]="project" /></div>
            }
          </div>
          @if (!showMore() && d.projects.length > initialCount) {
            <button type="button" class="btn-pill pressable mt-4" (click)="showMore.set(true)">Show more</button>
          }
        </div>
      </div>
    } @else {
      <app-spinner />
    }
  `,
})
export class Projects {
  readonly header = input<string>();
  protected readonly initialCount = INITIAL_COUNT;
  protected readonly data = inject(ProfileData).load<ProjectsData>('projects');
  protected readonly showMore = signal(false);
  protected readonly visible = computed(() => {
    const projects = this.data()?.projects ?? [];
    return this.showMore() ? projects : projects.slice(0, INITIAL_COUNT);
  });
}
