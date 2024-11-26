import { Component, Input, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { DenunciaDTO } from '../../model/dto/denunciaDto';
import { DenunciaService } from '../../service/denuncia.service';
import { MensagemService } from '../../service/mensagem.service';
import { UsuarioService } from '../../service/usuario.service';
import { Mensagem } from './../../model/entities/mensagem';
import { Usuario } from './../../model/entities/usuario';
import { AuthService } from './../../service/auth-service';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrl: './post-card.component.scss'
})
export class PostCardComponent implements OnInit {
  @Input() mensagem!: Mensagem;
  usuarioAutenticadoId!: string;
  usuario!: Usuario;
  usuarioAutenticadoCurtiu: boolean = false;
  @Input() denunciaDTO: DenunciaDTO = new DenunciaDTO();
  menuAberto: boolean = false;
  usuarioAutenticado!: Usuario;
  modalAberto!: boolean;

  constructor(
    private mensagemService: MensagemService,
    private usuarioService: UsuarioService
  ) { }

  ngOnInit(): void {
    this.usuarioService.getAuthenticatedUser().subscribe({
      next: (data) => {
        this.usuarioAutenticado = data;
        this.usuarioAutenticadoId = this.usuarioAutenticado.id; // Atribui o ID do usuário autenticado
        this.getUsuarioAutenticadoCurtiu(); // Agora que temos o ID do usuário autenticado, podemos chamar o método
      },
      error: (error) => {
        console.error('Erro ao obter usuário autenticado', error);
      },
    });
  }

  getUsuarioAutenticadoCurtiu() {
    if (this.mensagem.usuariosQueCurtiram.some(
      (usuario) => usuario.id === this.usuarioAutenticadoId
    )) {
      this.usuarioAutenticadoCurtiu = true;
    } else {
      this.usuarioAutenticadoCurtiu = false;
    }
  }

  exibirImagemGrande(imagemBase64: string) {
    Swal.fire({
      title: 'Imagem da Mensagem',
      html: `<img src="data:image/jpeg;base64,${imagemBase64}" alt="Imagem da Carta" style="max-width: 100%; height: auto;">`,
      width: '80%',
      showCloseButton: true,
      showConfirmButton: false,
      background: '#fff',
      padding: '20px'
    });
  }

  curtir(): void {
    this.mensagemService.curtir(this.mensagem.id).subscribe(() => {
      this.usuarioAutenticadoCurtiu = !this.usuarioAutenticadoCurtiu;
      this.mensagem.qtdeLikes = this.mensagem.usuariosQueCurtiram.length;
      this.refreshMensagem();
    });
  }

  refreshMensagem(): void {
    this.mensagemService.getMensagemById(this.mensagem.id).subscribe((mensagemAtualizada) => {
      this.mensagem = mensagemAtualizada;
    });
  }

  toggleMenu(): void {
    this.menuAberto = !this.menuAberto;
    this.denunciaDTO.idMensagem = this.mensagem.id;
  }

  excluirMensagem(): void {
    Swal.fire({
      title: 'Tem certeza?',
      text: 'Você deseja excluir esta mensagem? Esta ação não pode ser desfeita.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sim, excluir',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.mensagemService.excluirMensagem(this.mensagem.id).subscribe(() => {
          Swal.fire('Excluído!', 'A mensagem foi excluída.', 'success');
          this.menuAberto = false;
          // Aqui você pode emitir um evento para atualizar a lista de mensagens no componente pai
        });
      }
    });
  }

  isUsuarioAutenticado(): boolean {
    return this.usuarioAutenticado.id == this.mensagem.publicador?.id;
  }

  abrirModalDenuncia(): void {
    this.denunciaDTO.idMensagem = this.mensagem.id;
    this.denunciaDTO.idUsuario = this.mensagem.publicador.id;
    this.denunciaDTO.nomeDenunciante = this.usuarioAutenticado.nome;
    this.denunciaDTO.conteudoMensagem = this.mensagem.texto;
    this.denunciaDTO.dataDenuncia = new Date();

    this.modalAberto = true; // Exibe o modal
    this.menuAberto = false; // Fecha o menu
  }

  fecharModalDenuncia(): void {
    this.modalAberto = false; // Fecha o modal
  }

}
