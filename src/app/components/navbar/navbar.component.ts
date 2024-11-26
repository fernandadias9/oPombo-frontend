import { Router } from '@angular/router';
import { Usuario } from '../../model/entities/usuario';
import { UsuarioService } from '../../service/usuario.service';
import { AuthService } from './../../service/auth-service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {
  isMenuOpen = false;
  usuarioAutenticado!: Usuario;
  isAdmin = false;
  idUsuarioAutenticado!: string;

  constructor(
    private authService: AuthService,
    private usuarioService: UsuarioService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.usuarioService.getAuthenticatedUser().subscribe({
      next: (data) => {
        this.usuarioAutenticado = data;
        this.idUsuarioAutenticado = data.id;
      },
      error: (error) => {
        console.error('Erro ao obter usuário autenticado', error);
      },
    });
    const tipoUsuarioAutenticado = this.authService.getTipoFromToken();

    if (tipoUsuarioAutenticado === 'ADMINISTRADOR') {
      this.isAdmin = true;
    }
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  signout() {
    this.authService.sair();
  }

  editarPerfil(idUsuario: string) {
    this.router.navigate(['/perfil/', idUsuario]);
  }
}
