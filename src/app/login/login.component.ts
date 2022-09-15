import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  matcher = new MyErrorStateMatcher();

  constructor(private router: Router, private fb: FormBuilder) {
    this.setForm();
  }

  ngOnInit(): void {}

  login(): void {
    this.router.navigate(['/home']);
  }

  private setForm(): void {
    this.loginForm = this.fb.group({
      username: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
    });
  }
}
