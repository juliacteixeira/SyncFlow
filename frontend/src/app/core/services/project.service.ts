import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, tap } from 'rxjs';
import { Project } from 'src/shared/models/project.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private apiUrl: string = 'http://localhost:3001'
  constructor(
    private http: HttpClient
  ) { }


  public getProjects(): Observable<Project[]> {

    const url = `${this.apiUrl}/project`;

    return this.http.get<Project[]>(url)
      .pipe(
        tap(data => console.log('Dados dos projetos:', data)),
        catchError(error => {
          console.error('Erro na requisição:', error);
          throw error; // rethrow the error
        })
      );
  }
}
