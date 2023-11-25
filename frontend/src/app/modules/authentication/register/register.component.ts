import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { catchError, of, tap } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registrationForm!: FormGroup;
  private readonly notifier: NotifierService;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private notifierService: NotifierService,
    private router: Router
  ) {
    this.notifier = this.notifierService;
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.registrationForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  register(): void {
    console.log('entrou aqui');
    console.log(this.registrationForm);

    if (this.registrationForm.valid) {
      const { name, email, password } = this.registrationForm.value;
      this.authService.register(name, email, password).pipe(
        tap(() => {
          console.log('inside tap');

          this.handleRegistrationSuccess();
        }),
        catchError(error => {
          console.log('Error caught:', error);
          this.handleRegistrationError(error)
          return of(null)
        })
      ).subscribe();
    }
  }

  private handleRegistrationSuccess(): void {
    console.log('success');

    this.notifier.notify('success', 'Registration successful! Redirecting to dashboard.');
    this.router.navigate(['/dashboard']);
  }

  private handleRegistrationError(error: any): void {
    this.notifier.notify('error', 'Registration failed. Check your credentials.');

    console.error('Registration failed. Check your credentials.', error);
    // Exibir mensagem de erro para o usuário ou tomar outras medidas adequadas
  }
}
