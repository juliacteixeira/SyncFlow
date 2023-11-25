import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ILoginResponse } from 'src/shared/models/auth.model';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = false;
  apiUrl = 'http://localhost:3001'

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<ILoginResponse> {
    console.log(email);

    const url = `${this.apiUrl}/login`
    const credentials = { email, password };
    // Implemente a lógica real de autenticação aqui
    // Aqui, apenas definimos isAuthenticated como true para simular um login bem-sucedido
    return this.http.post<any>(url, credentials);
  }

  logout(): void {
    // Implemente a lógica real de logout aqui
    // Aqui, apenas definimos isAuthenticated como false para simular um logout
    this.isAuthenticated = false;
  }

  isAuthenticatedUser(): boolean {
    return localStorage.getItem('tokenSF') ? true : false;
  }

  register(name: string, email: string, password: string): Observable<boolean> {
    const url = `${this.apiUrl}/user`;
    const type = 'common_user'
    const user = { name, email, password, type }
    return this.http.post<boolean>(url, user)
  }
}
