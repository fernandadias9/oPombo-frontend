import { Usuario } from '../../model/entities/usuario';
import { UsuarioService } from '../../service/usuario.service';
import { AuthService } from './../../service/auth-service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit{
  isMenuOpen = false;
  usuarioAutenticado: Usuario | undefined;

  constructor(
    private AuthService: AuthService,
    private usuarioService: UsuarioService){}


    ngOnInit(): void {
      this.usuarioService.getAuthenticatedUser().subscribe({
        next: (data) => {
          console.log('Usuário autenticado:', data);
          this.usuarioAutenticado = data;
        },
        error: (error) => {
          console.error('Erro ao obter usuário autenticado', error);
        },
      });
    }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  signout() {
    this.AuthService.sair();
  }
}
