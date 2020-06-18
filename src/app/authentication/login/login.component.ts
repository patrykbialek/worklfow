import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

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
    private formBuilder: FormBuilder,
    private renderer: Renderer2,
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      password: ['', Validators.required],
      userName: ['', Validators.required], 
    });

    setTimeout(() => {
      this.userNameHTML.nativeElement.focus();
    });
  }

  onImageLoad(evt) {
    if (evt && evt.target) {
      const width = evt.target.naturalWidth;
      const height = evt.target.naturalHeight;
      const portrait = height > width ? true : false;
      console.log(width, height, 'portrait: ', portrait);
    }
  }

}
