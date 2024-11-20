import { AuthService } from './../../service/auth-service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  isMenuOpen = false;

  constructor(private AuthService: AuthService){}

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  signout() {
    this.AuthService.sair();
  }
}
