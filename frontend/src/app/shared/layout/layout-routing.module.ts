import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from 'src/app/modules/profile/profile.component';
import { LayoutContentComponent } from './layout-content/layout-content.component';

const routes: Routes = [
  {
    path: '', component: LayoutContentComponent,
    children: [
      {
        path: 'profile', component: ProfileComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LayoutRoutingModule { }
