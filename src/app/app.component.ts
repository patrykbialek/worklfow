import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import * as fromAuthServices from '@authentication/services';
import * as fromSharedServices from '@shared/services';
import { take, tap, filter } from 'rxjs/internal/operators';
import { BoardsFacadeService } from '@shared/store/services';

import * as fromSettings from './shared/store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  // animations: [fadeAnimation],
})
export class AppComponent implements OnInit {
  user$ = this.authService.user$
    .pipe(
      tap(user => {
        if (user) {
          this.boardService.dispatch(new fromSettings.LoadBoards());
        }
      }),
    );
  boards$ = this.boardService.boards$.subscribe(console.log);

  public getRouterOutletState(outlet) {
    return outlet.isActivated ? outlet.activatedRoute : '';
  }

  constructor(
    private authService: fromAuthServices.AuthService,
    private router: Router,
    private spinnerService: fromSharedServices.AppSpinnerService,
    private usersHttpService: fromSharedServices.UsersHttpService,

    private boardService: BoardsFacadeService,
  ) { }

  ngOnInit() {
    this.usersHttpService.getUsers().pipe(
      take(1),
    ).subscribe();
  }

  onLogout() {
    this.authService.logout()
      .then(() => this.router.navigate(['/login']))
      .catch(console.log);
  }
}
