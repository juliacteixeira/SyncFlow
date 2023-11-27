import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { catchError, of, tap } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  private readonly notifier: NotifierService;

  constructor(private router: Router, private authService: AuthService, private notifierService: NotifierService) {
    this.notifier = this.notifierService
  }

  public goToProfile() {
    this.router.navigate(['/app/profile']);
  }

  public logout() {
    this.authService.logout().pipe(
      tap((response) => {
        this.handleLogoutSuccess(response);
      }),
      catchError(error => {
        this.handleLogoutError(error);
        return of(null);
      })
    ).subscribe();
  }

  private handleLogoutSuccess(response: boolean): void {
    if (!response) {
      this.notifier.notify('success', 'Logout success');
      this.router.navigate(['/auth']);
      localStorage.clear();
    }
  }

  private handleLogoutError(error: any): void {
    this.notifier.notify('error', `Não foi possível conectar ao sistema devido ao seguinte erro: ${error.error.message}`);
  }
}
