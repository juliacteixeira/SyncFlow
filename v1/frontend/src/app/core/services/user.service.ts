import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiUrl = 'http://localhost:3001'

  constructor(
    private http: HttpClient
  ) { }



  public getUser(): Observable<any> {

    const url = `${this.apiUrl}/user`;

    return this.http.get<any>(url)
      .pipe(
        tap(data => console.log('Dados do usuario:', data)),
        catchError(error => {
          console.error('Erro na requisição:', error);
          throw error; // rethrow the error
        })
      );
  }

}
