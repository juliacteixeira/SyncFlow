import { Component } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username = '';
  password = '';

  constructor(private authService: AuthService) { }

  login(): void {
    this.authService.login(this.username, this.password).subscribe((success) => {
      if (success) {
        console.log('Login bem-sucedido!');
        // Redirecionar para a página principal ou fazer outras ações pós-login
      } else {
        console.log('Falha no login. Verifique suas credenciais.');
        // Exibir mensagem de erro ou tomar outras medidas adequadas
      }
    });
  }
}
