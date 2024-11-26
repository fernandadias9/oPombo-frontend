import { Component } from '@angular/core';
import { UsuarioDTO } from '../../model/dto/usuarioDto';
import { AuthService } from '../../service/auth-service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  public usuarioDto: UsuarioDTO = {
    login: '',
    senha: '',
  };

  constructor(private authService: AuthService, private router: Router) {}

  public verificarPermissao() {
    const tipoUsuarioAutenticado = this.authService.getTipoFromToken();

    if (tipoUsuarioAutenticado === 'ADMINISTRADOR') {
      this.router.navigate(['/denuncias']);
    } else {
      this.router.navigate(['/feed']);
    }
  }

  public realizarLogin() {
    this.authService.autenticar(this.usuarioDto).subscribe({
      next: (jwt) => {
        Swal.fire({
          icon: 'success',
          title: 'Sucesso',
          text: 'Usuário autenticado com sucesso.',
          timer: 2000,
          showConfirmButton: false,
        });
        let token: string = jwt.body + '';
        localStorage.setItem('tokenUsuarioAutenticado', token);
        this.verificarPermissao();
      },
      error: (erro) => {
        var mensagem: string;
        if (erro.status == 401) {
          mensagem = 'Usuário ou senha inválidos, tente novamente';
        } else {
          mensagem = erro.error;
        }
        Swal.fire({
          icon: 'error',
          title: 'Erro',
          text: 'Usuário ou senha inválidos, tente novamente.',
          timer: 2000,
          showConfirmButton: false,
        });
        Swal.fire('Erro', mensagem, 'error');
      },
    });
  }
}
