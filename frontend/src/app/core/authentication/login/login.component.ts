import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  username: string = '';
  password: string = '';

  constructor(private router: Router) { }

  login(): void {
    // Lógica de autenticação (exemplo: verificar credenciais)
    // Se as credenciais são válidas, redirecione para a página principal
    if (this.username === 'usuario' && this.password === 'senha') {
      this.router.navigate(['/dashboard']);
    } else {
      alert('Credenciais inválidas. Tente novamente.');
    }
  }
}
