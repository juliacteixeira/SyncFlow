import { Component } from '@angular/core';
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
  addProject() {
    // Implemente a lógica para adicionar um novo projeto
    console.log('Adicionar Projeto');
  }

  editProject(projectId: number) {
    // Implemente a lógica para editar o projeto com o ID fornecido
    console.log('Editar Projeto ID:', projectId);
  }

  deleteProject(projectId: number) {
    // Implemente a lógica para excluir o projeto com o ID fornecido
    console.log('Excluir Projeto ID:', projectId);
  }

  startProject(project: Project) {
    console.log(project);

  }
}
