import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = false;

  login(username: string, password: string): Observable<boolean> {
    // Implemente a lógica real de autenticação aqui
    // Aqui, apenas definimos isAuthenticated como true para simular um login bem-sucedido
    this.isAuthenticated = true;
    return of(true);
  }

  logout(): void {
    // Implemente a lógica real de logout aqui
    // Aqui, apenas definimos isAuthenticated como false para simular um logout
    this.isAuthenticated = false;
  }

  isAuthenticatedUser(): boolean {
    return this.isAuthenticated;
  }
}
