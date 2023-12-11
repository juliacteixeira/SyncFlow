import { Component, Input, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Project } from 'src/shared/models/project.model';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss']
})
export class ProjectDetailsComponent implements OnInit {
  @Input() project!: Project

  activeModal = inject(NgbActiveModal);

  constructor(
    private activatedRoute: ActivatedRoute
  ) {

  }

  ngOnInit() {
    console.log(this.project);

  }
}
