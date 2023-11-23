import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RegisterComponent } from '../register/register.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router, private route: ActivatedRoute) {
    this.route.component = RegisterComponent

  }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  login(): void {
    if (this.loginForm.valid) {
      // Lógica de autenticação (exemplo: verificar credenciais)
      // Se as credenciais são válidas, redirecione para a página principal
      const username = this.loginForm.get('username').value;
      const password = this.loginForm.get('password').value;

      // Implemente sua lógica de autenticação aqui
      if (username === 'usuario' && password === 'senha') {
        this.router.navigate(['/projects']);
      } else {
        alert('Credenciais inválidas. Tente novamente.');
      }
    }
  }

  goToRegister(): void {
    console.log('entrou aqui');

    this.router.navigate(['/cadastro']);
  }
}
