import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ProjectService } from 'src/app/core/services/project.service';

@Component({
  selector: 'app-project-add',
  templateUrl: './project-add.component.html',
  styleUrls: ['./project-add.component.scss'],
  providers: [
    NgbActiveModal
  ]
})
export class ProjectAddComponent implements OnInit {
  projectForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    public activeModal: NgbActiveModal,
    private projectService: ProjectService
  ) {

  }

  ngOnInit() {
    this.initForm();
  }

  initForm(): void {
    this.projectForm = this.fb.group({
      name_project: ['', Validators.required],
      description: ['', Validators.required],
      // Adicione outros campos do seu projeto, como date_create, date_last_update, etc.
    });
  }
  onSubmit(): void {
    if (this.projectForm.valid) {
      const newProject = this.projectForm.value;

      this.projectService.addProject(newProject).subscribe({
        next: () => this.handleSuccess('Projeto adicionado com sucesso.'),
        error: (error) => this.handleError('Erro ao adicionar projeto', error),
        complete: () => {
          // Fecha a modal (exemplo hipotético)
          this.closeModal();
        },
      });
    }
  }

  private handleSuccess(message: string): void {
    console.log(message);
    this.projectForm.reset();
  }

  private handleError(message: string, error: any): void {
    console.error(message, error);
  }

  private closeModal(): void {
    this.activeModal.close('Projeto adicionado com sucesso')
  }

}
