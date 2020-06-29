import { Component, OnInit, ViewChild, ElementRef, Renderer2, Inject, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import * as fromAuthServices from '@authentication/services';
import * as fromSharedServices from '@shared/services';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnDestroy, OnInit {

  errorMessage: string;
  errorMessages = {
    'There is no user record corresponding to this identifier. The user may have been deleted.': 'E-mail i/lub hasło nieprawidłowe.',
    'The password is invalid or the user does not have a password.': 'E-mail i/lub hasło nieprawidłowe.',
    'Default': 'Wystąpił problem, spróbuj ponownie.',
  };
  loginForm: FormGroup;

  @ViewChild('form') formHTML: ElementRef;
  @ViewChild('email') emailHTML: ElementRef;

  constructor(
    @Inject(DOCUMENT) private document: Document,

    private authService: fromAuthServices.AuthService,
    private formBuilder: FormBuilder,
    private renderer: Renderer2,
    private router: Router,
    private spinnerService: fromSharedServices.AppSpinnerService,
  ) { }

  ngOnDestroy() {
    this.document.body.classList.remove('is-login-page');
  }

  ngOnInit(): void {
    this.authService.logout();

    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
      password: ['', Validators.required],
    });

    setTimeout(() => {
      this.emailHTML.nativeElement.focus();
    }, 3000);

    this.loginForm.valueChanges.subscribe(() => {
      if (this.errorMessage) { this.errorMessage = null; }
    });

    this.document.body.classList.add('is-login-page');
  }

  // onImageLoad(evt) {
  //   if (evt && evt.target) {
  //     const width = evt.target.naturalWidth;
  //     const height = evt.target.naturalHeight;
  //     const portrait = height > width ? true : false;
  //   }
  // }

  onLogin() {
    this.spinnerService.show();
    this.errorMessage = null;
    const payload = this.loginForm.value;
    this.authService.login(payload)
      .then(() => this.router.navigate(['/dashboard']))
      .catch((error: any) => {
        this.spinnerService.hide();
        this.errorMessage = this.errorMessages[error.message];
      });
  }

}
