import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgIconsModule } from '@ng-icons/core';
import { heroBars3, heroBellAlert, heroHome, heroMagnifyingGlass, heroUserCircle } from '@ng-icons/heroicons/outline';
import { DashboardModule } from 'src/app/modules/dashboard/dashboard.module';
import { LayoutContentComponent } from './layout-content/layout-content.component';
import { LayoutRoutingModule } from './layout-routing.module';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';


@NgModule({
  declarations: [
    SidebarComponent,
    NavbarComponent,
    LayoutContentComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    LayoutRoutingModule,
    DashboardModule,
    NgIconsModule.withIcons({ heroHome, heroBellAlert, heroBars3, heroUserCircle, heroMagnifyingGlass }),
  ],
  exports: [
    LayoutContentComponent
  ]

})
export class LayoutModule { }
