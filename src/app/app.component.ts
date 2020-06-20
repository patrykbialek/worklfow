import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from './authentication/auth.service';
import { AppSpinnerService } from './shared/app-spinner/app-spinner.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  user$ = this.authService.user$;

  constructor(
    private authService: AuthService,
    private router: Router,
    private spinnerService: AppSpinnerService,
  ) { }

  ngOnInit() {
  }

  onLogout() {
    this.authService.logout()
      .then(() => this.router.navigate(['/login']))
      .catch(console.log);
  }
}
