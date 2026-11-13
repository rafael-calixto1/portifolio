import { Component, input } from '@angular/core';

@Component({
  selector: 'app-header',
  template: `<div class="header">{{ title() }}</div>`,
})
export class Header {
  readonly title = input.required<string>();
}
