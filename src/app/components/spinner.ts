import { Component } from '@angular/core';

@Component({
  selector: 'app-spinner',
  template: `<div class="spinner-wrap"><div class="spinner-grow" role="status"><span class="visually-hidden">Loading...</span></div></div>`,
  styles: `.spinner-wrap { display: flex; justify-content: center; align-items: center; height: 100%; }`,
})
export class Spinner {}
