import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, tap } from 'rxjs';
import { Task } from 'src/shared/models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl: string = 'http://localhost:3001';
  private authToken = localStorage.getItem('tokenSF');

  constructor(
    private http: HttpClient
  ) { }

  addTask(task: Task): Observable<any> {
    const url = `${this.apiUrl}/task`;
    const headers = this.createHeaders();
    const formattedTask: Task = this.formatTaskForBackend(task);

    return this.http.post(url, formattedTask, { headers });
  }

  public createHeaders(): HttpHeaders {
    return new HttpHeaders().set('Authorization', `${this.authToken}`);
  }

  private formatTaskForBackend(task: Task): Task {
    return {
      name_task: task.name_task,
      description: '',
      data_create: new Date(),
      date_conclusion: new Date(),
      project_id: task.project_id,
      status: task.status

    }
  }

  public getTasks(taskId: number): Observable<Task[]> {

    const url = `${this.apiUrl}/task`;

    return this.http.get<Task[]>(`${url}?project_id=${taskId}`,)
      .pipe(
        tap(data => console.log('Dados dos projetos:', data)),
        catchError(error => {
          console.error('Erro na requisição:', error);
          throw error; // rethrow the error
        })
      );
  }

  public updateTask(task: Task, finishTask: boolean): Observable<any> {
    const url = `${this.apiUrl}/task`;
    const headers = this.createHeaders();

    console.log(task.project_id);

    const formattedTask: Task = {
      task_id: task.task_id,
      name_task: task.name_task,
      status: task.status,
      date_conclusion: finishTask ? new Date() : undefined,
      data_create: task.data_create,
      project_id: task.project_id
    };

    return this.http.put(url, formattedTask, { headers });
  }


  public deleteTask(task: Task): Observable<any> {
    const url = `${this.apiUrl}/task`;
    const headers = this.createHeaders();
    console.log(task.task_id);

    console.log(this.http.delete<void>(`${url}/${task.task_id}`, { headers }));


    return this.http.delete<void>(`${url}/${task.task_id}`, { headers })

  }
}
