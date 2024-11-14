import { Component } from '@angular/core';
import { Usuario } from '../../model/entities/usuario';
import { AuthService } from '../../service/auth-service.service';
import Swal from 'sweetalert2';
import { TipoDeUsuario } from '../../model/enums/tipoUsuario';

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

  constructor(private authService: AuthService) {}

  onSubmit() {
    console.log(this.usuario);
    this.authService.salvarUsuario(this.usuario).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Sucesso',
          text: 'Usuário salvo com sucesso!',
          timer: 3000,
          showConfirmButton: false
        });
      },
      error: (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Erro',
          text: error.message || 'Ocorreu um erro ao salvar o usuário.',
          timer: 3000,
          showConfirmButton: false
        });
      }
    });
  }
}
