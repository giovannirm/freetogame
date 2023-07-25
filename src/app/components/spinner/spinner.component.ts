import { Component } from '@angular/core'

@Component({
  selector: 'app-spinner',
  template: `
  <div class="spinner-border" style="width: 4rem; height: 4rem;" role="status">
    <span class="visually-hidden">Loading...</span>
  </div>
  `
})
export class SpinnerComponent { }
