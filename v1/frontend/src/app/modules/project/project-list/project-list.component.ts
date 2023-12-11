import { Component, TemplateRef, inject } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NotifierService } from 'angular-notifier';
import { Subscription, catchError, of, tap } from 'rxjs';
import { ProjectService } from 'src/app/core/services/project.service';
import { Project } from 'src/shared/models/project.model';
import { ProjectDetailsComponent } from './../project-details/project-details.component';

import { UserService } from 'src/app/core/services/user.service';
import { colors } from 'src/shared/utils/utils';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent {
  projects: Project[] = []
  subscription: Subscription = new Subscription;
  filterByName: string = '';
  private readonly notifier!: NotifierService;
  user: any

  private modalService = inject(NgbModal);
  closeResult = '';
  private userId = localStorage.getItem('userIdSF');

  get filteredProjects(): Project[] {
    return this.projects.filter((project) =>
      project.name_project?.toLowerCase().includes(this.filterByName.toLowerCase())
    );
  }

  constructor(
    private projectService: ProjectService,
    private userService: UserService,
    private router: Router,
    private notifierService: NotifierService
  ) {
    this.notifier = this.notifierService
  }

  ngOnInit(): void {
    this.loadProjects();

  }

  loadProjects(): void {
    let index = Math.floor(Math.random() * colors.length);


    this.subscription = this.projectService.getProjects(this.userId).subscribe({
      next: (data) => {
        this.projects = data.map(project => ({
          ...project,
          randomColor: colors[index++ % colors.length],
        }));
      },
      error: (error) => {
        console.error('Erro ao carregar projetos', error);
      },
    });
  }


  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  startProject(project: Project) {
    console.log(project);
    this.projectService.updateProject(project, true).pipe(
      tap((response) => {
        this.subscribeToProjectsUpdate(response);
        this.handleSuccess('Projeto atualizado com sucesso.');
      }),
      catchError(error => {
        this.handleError('Erro ao atualizar projeto', error);
        return of(null)
      })
    ).subscribe();
  }

  addProject(newProject: TemplateRef<any>) {
    this.modalService.open(newProject, { ariaLabelledBy: 'modal-basic-title', centered: true }).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      },
    );
  }

  openProject(project: Project) {
    const modalRef = this.modalService.open(ProjectDetailsComponent, { ariaLabelledBy: 'modal-basic-title', centered: true, size: 'xl' });
    modalRef.componentInstance.project = project;

    console.log(project);


  }

  private subscribeToProjectsUpdate(project: Project[]): void {

    let index = Math.floor(Math.random() * colors.length);

    this.projects.push({
      ...project[0],
      randomColor: colors[index],
    });
  }

  saveProject(formData: any) {
    console.log(this.user);

    this.projectService.addProject(formData, this.userId).pipe(
      tap((response) => {
        this.subscribeToProjectsUpdate(response);
        this.handleSuccess('Projeto adicionado com sucesso.');
      }),
      catchError(error => {
        this.handleError('Erro ao adicionar projeto', error);
        return of(null)
      })
    ).subscribe();
  }


  private handleSuccess(message: string): void {
    this.notifier.notify('success', message);
    this.modalService.dismissAll();

  }

  private handleError(message: string, error: any): void {
    console.error(message, error);
    this.notifier.notify('error', message);

  }


}
