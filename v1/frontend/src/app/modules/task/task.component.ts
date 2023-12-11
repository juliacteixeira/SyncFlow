import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotifierService } from 'angular-notifier';
import { Subscription, catchError, of, tap } from 'rxjs';
import { TaskService } from 'src/app/core/services/task.service';
import { Task } from 'src/shared/models/task.model';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {

  @Input() projectId: number = 0

  tasks: Task[] = [];
  taskEditing = false
  taskForm!: FormGroup;
  private readonly notifier!: NotifierService;
  subscription: Subscription = new Subscription;

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private notifierService: NotifierService,
    private http: HttpClient
  ) {
    this.notifier = this.notifierService
  }

  ngOnInit() {
    console.log(this.projectId);
    this.initForm();
    this.loadTasks();
  }


  loadTasks(): void {
    this.subscription = this.taskService.getTasks(this.projectId).subscribe({
      next: (data) => {
        this.tasks = data.map(task => ({
          ...task,
        }));
      },
      error: (error) => {
        console.error('Erro ao carregar projetos', error);
      },
    });
  }

  toggleTaskStatus(task: Task): void {
    // Alterna o status da tarefa entre 'concluído' e 'não concluído'
    console.log(task);

    task.status = task.status === 'concluído' ? 'não iniciado' : 'concluído';

    this.taskService.updateTask(task, true).pipe(
      tap((response) => {
        console.log(response);

        this.handleSuccess('Projeto adicionado com sucesso.');
      }),
      catchError(error => {
        this.handleError('Erro ao adicionar projeto', error);
        return of(null)
      })
    ).subscribe();
  }

  deleteTask(task: Task): void {
    console.log(`Excluir tarefa: ${task.task_id}`);
    const token = localStorage.getItem('tokenSF')
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `${token}`,
    });

    this.http.delete(`http://localhost:3001/task/${task.task_id}`, { headers }).subscribe((res) => {
      console.log(res);
      this.tasks = this.tasks.filter((t) => t.task_id !== task.task_id);
    });

  }

  initForm(): void {
    this.taskForm = this.fb.group({
      name_task: ['', Validators.required],
    });
  }

  onSubmit(): void {
    console.log(this.taskForm.value);

    const params: Task = { ...this.taskForm.value, project_id: this.projectId, status: 'não iniciado' };
    console.log(params);

    this.taskService.addTask(params).pipe(
      tap((response) => {
        console.log(response);

        this.subscribeToTaskUpdate(response);
        this.handleSuccess('Projeto adicionado com sucesso.');
      }),
      catchError(error => {
        this.handleError('Erro ao adicionar projeto', error);
        return of(null)
      })
    ).subscribe();
  }


  private subscribeToTaskUpdate(task: Task[]): void {

    this.tasks.push({
      ...task[0],
    });
  }
  private handleSuccess(message: string): void {
    this.notifier.notify('success', message);

  }

  private handleError(message: string, error: any): void {
    console.error(message, error);
    this.notifier.notify('error', message);
  }

}
