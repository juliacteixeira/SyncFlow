import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { catchError, of, tap } from 'rxjs';
import { IUser } from 'src/shared/models/auth.model';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm!: FormGroup;
  private readonly notifier: NotifierService;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private notifierService: NotifierService
  ) {
    this.notifier = this.notifierService
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }


  login(): void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.getRawValue() as IUser;

      this.authService.login(email, password).pipe(
        tap((response) => {
          console.log(typeof response);

          this.handleRegistrationSuccess(response, email);
        }),
        catchError(error => {
          this.handleRegistrationError(error);
          return of(null);
        })
      ).subscribe();
    }

  }

  private handleRegistrationSuccess(token: any, email: string): void {
    this.notifier.notify('success', 'Login success');
    localStorage.setItem('tokenSF', token);
    localStorage.setItem('userSF', email);
    this.router.navigate(['/home']);
  }

  private handleRegistrationError(error: any): void {
    this.notifier.notify('error', `Não foi possível conectar ao sistema devido ao seguinte erro: ${error.error.message}`);
  }

}
