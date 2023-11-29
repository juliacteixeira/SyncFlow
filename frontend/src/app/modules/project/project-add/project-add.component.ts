import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
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

  @Output() private onFormChange = new EventEmitter<any>();


  constructor(
    private fb: FormBuilder,
    public activeModal: NgbActiveModal,
    public modalService: NgbModal,
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
    });
  }
  onSubmit(): void {
    if (this.projectForm.valid) {
      this.onFormChange.emit(this.projectForm.value)
    }
  }

}
