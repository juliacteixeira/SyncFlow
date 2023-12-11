import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from 'src/app/modules/dashboard/dashboard.component';
import { LayoutContentComponent } from './layout-content/layout-content.component';

const routes: Routes = [
  {
    path: '', component: LayoutContentComponent,
    children: [
      {
        path: '', component: DashboardComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LayoutRoutingModule { }
