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


  public getProjects(user_id?: any): Observable<Project[]> {

    console.log(user_id);


    const url = `${this.apiUrl}/project?user_id=${user_id}`;


    return this.http.get<Project[]>(url)
      .pipe(
        tap(data => console.log('Dados dos projetos:', data)),
        catchError(error => {
          console.error('Erro na requisição:', error);
          throw error; // rethrow the error
        })
      );
  }

  addProject(project: Project, user_id: any): Observable<any> {
    const url = `${this.apiUrl}/project`;
    const headers = this.createHeaders();
    const formattedProject: Project = this.formatProjectForBackend(project, user_id);
    console.log(user_id);

    console.log(formattedProject);

    return this.http.post(url, formattedProject, { headers });
  }

  private createHeaders(): HttpHeaders {
    return new HttpHeaders().set('Authorization', `${this.authToken}`);
  }

  private formatProjectForBackend(project: Project, user_id: number): Project {
    return {
      name_project: project.name_project,
      description: project.description,
      date_create: new Date(),
      date_last_update: new Date(),
      user_id: user_id
    }
  }

  public updateProject(project: Project, startProject: boolean): Observable<any> {
    const url = `${this.apiUrl}/project`;
    const headers = this.createHeaders();

    console.log(project);

    const formattedProject: Project = {
      project_id: project.project_id,
      name_project: project.name_project,
      description: project.description,
      date_create: project.date_create,
      date_last_update: startProject ? new Date() : undefined,
      user_id: project.user_id
    };

    return this.http.put(url, formattedProject, { headers });
  }

}
