import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgIconsModule } from '@ng-icons/core';
import { heroBars3, heroBellAlert, heroHome, heroUserCircle } from '@ng-icons/heroicons/outline';
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
    NgIconsModule.withIcons({ heroHome, heroBellAlert, heroBars3, heroUserCircle }),

  ],
  exports: [
    LayoutContentComponent
  ]

})
export class LayoutModule { }
