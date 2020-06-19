import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from './authentication/auth.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  user$ = this.authService.user$;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  onLogout() {
    this.authService.logout()
      .then(() => this.router.navigate(['/']))
      .catch(console.log);
  }
}
