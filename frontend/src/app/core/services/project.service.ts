import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, catchError, tap } from 'rxjs';
import { Project } from 'src/shared/models/project.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private apiUrl: string = 'http://localhost:3001';
  private authToken = localStorage.getItem('tokenSF');

  private projectsSubject = new Subject<void>();

  projects$ = this.projectsSubject.asObservable();

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

  addProject(project: Project): Observable<any> {
    const url = `${this.apiUrl}/project`;
    const headers = this.createHeaders();
    const formattedProject: Project = this.formatProjectForBackend(project);

    return this.http.post(url, formattedProject, { headers });
  }

  private createHeaders(): HttpHeaders {
    return new HttpHeaders().set('Authorization', `${this.authToken}`);
  }

  private formatProjectForBackend(project: Project): Project {
    return {
      name_project: project.name_project,
      description: project.description,
      date_create: new Date(),
      date_last_update: new Date(),
      user_id: 14
    }
  }
}
