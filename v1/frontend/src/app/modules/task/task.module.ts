import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgIconsModule } from '@ng-icons/core';
import { heroPencil, heroTrash } from '@ng-icons/heroicons/outline';
import { TaskComponent } from './task.component';

@NgModule({
  declarations: [TaskComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgIconsModule.withIcons({ heroPencil, heroTrash })
  ],
  exports: [
    TaskComponent
  ]
})
export class TaskModule { }
