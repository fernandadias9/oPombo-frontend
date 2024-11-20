import { Component } from '@angular/core';
import { Usuario } from '../../model/entities/usuario';
import { AuthService } from '../../service/auth-service';
import Swal from 'sweetalert2';
import { TipoDeUsuario } from '../../model/enums/tipoUsuario';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro-usuario',
  templateUrl: './cadastro-usuario.component.html',
  styleUrl: './cadastro-usuario.component.scss'
})
export class CadastroUsuarioComponent {
  public usuario: Usuario = {
    id: '',
    nome: '',
    cpf: '',
    email: '',
    tipoUsuario: TipoDeUsuario.USUARIO,
    senha: ''
  };

  errorMessage: string | null | undefined;

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.authService.salvarUsuario(this.usuario).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Sucesso',
          text: 'Usuário salvo com sucesso.',
          timer: 2000,
          showConfirmButton: false
        });
    this.router.navigate(['']);
      },
      error: (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Erro',
          text: error.message || 'Ocorreu um erro ao salvar o usuário.',
          timer: 2000,
          showConfirmButton: false
        });
      }
    });
  }
}
