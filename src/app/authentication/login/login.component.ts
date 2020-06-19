import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

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
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private renderer: Renderer2,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });

    setTimeout(() => {
      this.emailHTML.nativeElement.focus();
    }, 3000);

    this.loginForm.valueChanges.subscribe(() => {
      if (this.errorMessage) { this.errorMessage = null; }
    });
  }

  // onImageLoad(evt) {
  //   if (evt && evt.target) {
  //     const width = evt.target.naturalWidth;
  //     const height = evt.target.naturalHeight;
  //     const portrait = height > width ? true : false;
  //   }
  // }

  onLogin() {
    // this.isLoading = true;
    this.errorMessage = null;
    const payload = this.loginForm.value;
    this.authService.login(payload)
    .then(() => this.router.navigate(['/dashboard']))
    .catch((error: any) => {
        // this.isLoading = false;
        this.errorMessage = this.errorMessages[error.message];
      });
  }

}
