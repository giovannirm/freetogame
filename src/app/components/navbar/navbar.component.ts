import { Component } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent {
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  updateURL({ target }: Event) {
    const { value } = target as HTMLInputElement
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { search: value },
      queryParamsHandling: 'merge',
    });
  }
}