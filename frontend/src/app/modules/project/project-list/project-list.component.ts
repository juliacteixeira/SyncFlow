import { Component } from '@angular/core';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent {
  projects = [
    { id: 1, name: 'Projeto A', startDate: new Date('2023-01-01') },
    { id: 2, name: 'Projeto B', startDate: new Date('2023-02-15') },
    // Adicione mais projetos conforme necessário
  ];

  filterByName: string = '';

  get filteredProjects() {
    return this.projects.filter((project) =>
      project.name.toLowerCase().includes(this.filterByName.toLowerCase())
    );
  }

  constructor() { }

  ngOnInit(): void { }

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
}
