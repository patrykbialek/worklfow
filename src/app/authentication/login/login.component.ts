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

  loginForm: FormGroup;

  @ViewChild('form') formHTML: ElementRef;
  @ViewChild('userName') userNameHTML: ElementRef;

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
      this.userNameHTML.nativeElement.focus();
    }, 3000);
  }

  onImageLoad(evt) {
    if (evt && evt.target) {
      const width = evt.target.naturalWidth;
      const height = evt.target.naturalHeight;
      const portrait = height > width ? true : false;
    }
  }

  onLogin() {
    // this.isLoading = true;
    // this.errorMessage = null;
    const payload = this.loginForm.value;
    this.authService.login(payload)
    .then(() => this.router.navigate(['/dashboard']))
    .catch(err => {
      console.log(err)
        // this.isLoading = false;
        // this.errorMessage = err.message;
      });
  }

}
