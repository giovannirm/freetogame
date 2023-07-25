import { Component } from '@angular/core';

@Component({
  selector: 'app-spinner-image',
  template: `
  <div class="spinner-grow" style="width: 3rem; height: 3rem;" role="status">
    <span class="visually-hidden">Loading...</span>
  </div>
  `
})
export class SpinnerImageComponent {

}
