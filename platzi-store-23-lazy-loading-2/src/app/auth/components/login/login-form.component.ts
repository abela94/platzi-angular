import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  form: FormGroup

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.buildForm()
  }

  ngOnInit() {
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    })
  }

  login(event: Event){
    event.preventDefault()
    if (this.form.valid) {
      const value = this.form.value
      this.authService.loginUser(value.email, value.password)
        .then(() => {
          this.router.navigate(['/admin'])
        })
        .catch(() => {
          alert('No valido')
        })
    }
  }

  get emailField() {
    return this.form.get('email')
  }

  get passwordField() {
    return this.form.get('password')
  }

}
