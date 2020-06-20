import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from './authentication/auth.service';
import { AppSpinnerService } from './shared/app-spinner/app-spinner.service';
import { fadeAnimation } from './animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  // animations: [fadeAnimation],
})
export class AppComponent implements OnInit {
  user$ = this.authService.user$;


  public getRouterOutletState(outlet) {
    return outlet.isActivated ? outlet.activatedRoute : '';
  }
  
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
