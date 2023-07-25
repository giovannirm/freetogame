import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  template: `
    <app-navbar/>
    <router-outlet/>
  `
})
export class AppComponent {
  constructor(
    private title : Title,
    private meta  : Meta
  ) {
    this.title.setTitle('FreeToGame')    
    this.meta.updateTag({ name: 'description', content: 'watch free games online' })
  }
}
