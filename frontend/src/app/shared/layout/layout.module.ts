import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgIconsModule } from '@ng-icons/core';
import { heroBars3, heroBellAlert, heroHome, heroUserCircle } from '@ng-icons/heroicons/outline';
import { LayoutComponent } from './layout.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    NgIconsModule.withIcons({ heroHome, heroBellAlert, heroBars3, heroUserCircle }),

  ],
  declarations: [
    SidebarComponent,
    NavbarComponent,
    LayoutComponent
  ],

})
export class LayoutModule { }
