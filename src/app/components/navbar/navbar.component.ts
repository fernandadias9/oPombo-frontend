import { AuthService } from './../../service/auth-service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  isMenuOpen = false;
  isAdmin = false;

  constructor(private authService: AuthService){}

  ngOnInit(): void {
    const tipoUsuarioAutenticado = this.authService.getTipoFromToken();

    if(tipoUsuarioAutenticado ==='ADMINISTRADOR') {
      this.isAdmin = true;
    }
  }



  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  signout() {
    this.authService.sair();
  }
}
