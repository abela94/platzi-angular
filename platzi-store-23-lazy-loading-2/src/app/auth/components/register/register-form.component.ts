import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent implements OnInit {

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

  register(event: Event){
    event.preventDefault()
    if (this.form.valid) {
      const value = this.form.value
      this.authService.createUser(value.email, value.password)
        .then(() => {
          this.router.navigate(['/auth/login'])
        })
    }
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    })
  }

  get emailField() {
    return this.form.get('email')
  }

  get passwordField() {
    return this.form.get('password')
  }

}
