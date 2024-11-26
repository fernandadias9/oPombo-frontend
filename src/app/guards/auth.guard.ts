import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../service/auth-service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    const userRole = this.authService.getTipoFromToken();

    if (userRole === 'ADMINISTRADOR') {
      return true; 
    }

    this.router.navigate(['/sem-permissao']);
    return false;
  }
}
