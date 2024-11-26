import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UsuarioDTO } from '../../model/dto/usuarioDto';
import { Usuario } from '../../model/entities/usuario';
import { ImagemService } from '../../service/imagem.service';
import { TipoDeUsuario } from '../../model/enums/tipoUsuario';
import { UsuarioService } from './../../service/usuario.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.scss'
})
export class PerfilComponent implements OnInit {
  public idUsuario!: string;
  usuario!: Usuario;
  isEditMode: boolean = false;
  usuarioDto: UsuarioDTO = new UsuarioDTO();

  public imagePreview: string | ArrayBuffer | null = null;

  constructor(
    private usuarioService: UsuarioService,
    private imagemService: ImagemService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.idUsuario = params['idUsuario'];
      if (this.idUsuario) {
        this.buscarUsuario();
      }
    });
  }
  buscarUsuario(): void {
    this.usuarioService.buscar(this.idUsuario).subscribe(
      (user) => {
        this.usuario = user;
        this.construirUsuarioDto();
      },
      (erro) => {
        Swal.fire('Erro ao buscar usuário!', erro, 'error');
      }
    );
  }

  construirUsuarioDto(): void {
    this.usuarioDto = {
      id: this.usuario.id,
      nome: this.usuario.nome,
      email: this.usuario.email,
      cpf: this.usuario.cpf,
      tipo: this.usuario.tipoUsuario,
      fotoPerfil: this.usuario?.fotoPerfil
    }
  }

  toggleEditMode(): void {
    this.isEditMode = !this.isEditMode;
  }

  async onImagemSelecionada(event: any) {
    const file: File = event.target.files[0];
    if (file && file.size <= 10 * 1024 * 1024) { // Limite de 10MB
      this.usuarioDto.fotoPerfil = await this.filesToBase64(file);;
    } else {
      alert('Tamanho de arquivo não permitido! Máximo: 10MB.');
      this.usuarioDto.fotoPerfil = '';
      this.imagePreview = null; // Limpar o preview se não for um arquivo válido
    }
  }

  filesToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.result) {
          if (typeof reader.result === "string") {
            resolve(reader.result.split(",")[1]);
          } else {
            reject(new Error("FileReader result is not a string"));
          }
        } else {
          reject(new Error("FileReader result is null"));
        }
      };

      reader.onerror = reject;

      reader.readAsDataURL(file); // Read the file as a data URL
    });
  };

  saveProfile(): void {
    this.usuarioService.updateUser(this.usuarioDto).subscribe({
      next: () => {
        Swal.fire('Sucesso', 'Usuário atualizado com sucesso!', 'success');
      },
      error: (erro) => {
        Swal.fire('Erro', erro.error || 'Não foi possível atualizar usuário.', 'error');
      },
    })
  }

  cancelarEdicao() {
    if(this.usuario.tipoUsuario === TipoDeUsuario.ADMINISTRADOR) {
      this.router.navigate(['/denuncias']);
    } else {
      this.router.navigate(['/feed']);
    }
  }
}

