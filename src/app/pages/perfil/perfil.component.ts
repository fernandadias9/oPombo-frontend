import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsuarioService } from '../../service/usuario.service';
import { Usuario } from '../../model/entities/usuario';
import { ImagemService } from '../../service/imagem.service';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioDTO } from '../../model/dto/usuarioDto';
import { TipoDeUsuario } from '../../model/enums/tipoUsuario';

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

  public selectedFile: File | null = null;
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
      if(this.idUsuario) {
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
      fotoPerfil:this.usuario?.fotoPerfil
    }
  }

  toggleEditMode(): void {
    this.isEditMode = !this.isEditMode;
  }

  onImagemSelecionada(event: any) {
    const file: File = event.target.files[0];
    if (file && file.size <= 10 * 1024 * 1024) { // Limite de 10MB
      this.selectedFile = file;

      // Gerar o preview da imagem
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result; // Definir o preview da imagem
      };
      reader.readAsDataURL(file);
    } else {
      alert('Tamanho de arquivo não permitido! Máximo: 10MB.');
      this.selectedFile = null;
      this.imagePreview = null; // Limpar o preview se não for um arquivo válido
    }
  }

  uploadImagem(): void {
    const formData = new FormData();
    formData.append('imagem', this.selectedFile!, this.selectedFile!.name);

    this.imagemService.uploadImagem(formData).subscribe({
      next: () => {
        Swal.fire('Imagem carregada com sucesso!', '', 'success');
      },
      error: (erro) => {
        Swal.fire('Erro ao fazer upload da imagem: ' + erro.error, 'error');
      }
    });
  }

  saveProfile(): void {
    this.usuarioService.updateUser(this.usuarioDto).subscribe({
      next: () => {
        Swal.fire('Sucesso', 'Usuário atualizado com sucesso!', 'success');
        if(this.selectedFile) {
          this.uploadImagem();
        }
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
