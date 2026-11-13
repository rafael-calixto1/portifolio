import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { catchError, of } from 'rxjs';

const endpoints = {
  navbar: 'profile/navbar.json',
  home: 'profile/home.json',
  social: 'profile/social.json',
  about: 'profile/about.json',
  skills: 'profile/skills.json',
  education: 'profile/education.json',
  experiences: 'profile/experiences.json',
  projects: 'profile/projects.json',
} as const;

export type Endpoint = keyof typeof endpoints;

@Injectable({ providedIn: 'root' })
export class ProfileData {
  private readonly http = inject(HttpClient);

  /** Loads a profile JSON file as a signal (undefined while loading or on error). */
  load<T>(endpoint: Endpoint) {
    return toSignal(
      this.http.get<T>(endpoints[endpoint]).pipe(catchError(() => of(undefined))),
    );
  }
}
