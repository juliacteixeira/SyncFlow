import { Component, TemplateRef, inject } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { ProjectService } from 'src/app/core/services/project.service';
import { Project } from 'src/shared/models/project.model';

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

  private modalService = inject(NgbModal);
  closeResult = '';

  get filteredProjects(): Project[] {
    return this.projects.filter((project) =>
      project.name_project.toLowerCase().includes(this.filterByName.toLowerCase())
    );
  }

  constructor(
    private projectService: ProjectService
  ) { }

  ngOnInit(): void {
    this.loadProjects();
    this.subscribeToProjectsUpdate();
  }

  loadProjects(): void {
    let index = 0;
    this.subscription = this.projectService.getProjects().subscribe({
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
    // Certifique-se de desinscrever o observable ao destruir o componente
    this.subscription.unsubscribe();
  }

  startProject(project: Project) {
    console.log(project);

  }

  open(content: TemplateRef<any>) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', centered: true }).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      },
    );
  }

  private getDismissReason(reason: any): string {
    switch (reason) {
      case ModalDismissReasons.ESC:
        return 'by pressing ESC';
      case ModalDismissReasons.BACKDROP_CLICK:
        return 'by clicking on a backdrop';
      default:
        return `with: ${reason}`;
    }
  }

  private subscribeToProjectsUpdate(): void {
    this.projectService.projects$.subscribe(() => {
      // Recarrega a lista de projetos
      this.loadProjects();
    });
  }
}
