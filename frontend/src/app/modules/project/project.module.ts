import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgIconsModule } from '@ng-icons/core';
import { heroMagnifyingGlass, heroPlay } from '@ng-icons/heroicons/outline';
import { TaskModule } from '../task/task.module';
import { ProjectAddComponent } from './project-add/project-add.component';
import { ProjectDetailsComponent } from './project-details/project-details.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { ProjectRoutingModule } from './project-routing.module';

@NgModule({
  declarations: [
    ProjectListComponent,
    ProjectDetailsComponent,
    ProjectAddComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ProjectRoutingModule,
    TaskModule,
    NgbModule,
    NgIconsModule.withIcons({ heroMagnifyingGlass, heroPlay })
  ],
  exports: [
    ProjectListComponent
  ]
})
export class ProjectModule { }
