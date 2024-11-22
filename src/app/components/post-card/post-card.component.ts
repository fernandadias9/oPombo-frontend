import { AuthService } from './../../service/auth-service';
import { MensagemService } from '../../service/mensagem.service';
import { Mensagem } from './../../model/entities/mensagem';
import { Component, Input, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrl: './post-card.component.scss'
})
export class PostCardComponent implements OnInit {
  @Input() mensagem!: Mensagem;
  usuarioAutenticadoId!: string;
  usuarioAutenticadoCurtiu: boolean = false;

  constructor(
    private mensagemService: MensagemService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.usuarioAutenticadoId = this.authService.getUserIdFromToken() || '';
    this.getUsuarioAutenticadoCurtiu();
  }

  getUsuarioAutenticadoCurtiu() {
    if(this.mensagem?.usuariosQueCurtiram?.some(
      (usuario) => usuario.id === this.usuarioAutenticadoId
    )) {
      this.usuarioAutenticadoCurtiu = true;
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
    const usuarioId = this.authService.getUserIdFromToken();
    if (usuarioId) {
      this.mensagemService.curtir(usuarioId, this.mensagem.id).subscribe(() => {
        this.usuarioAutenticadoCurtiu = !this.usuarioAutenticadoCurtiu;
        this.mensagem.qtdeLikes = this.mensagem.usuariosQueCurtiram.length;
        this.refreshMensagem();
      });
    }
  }

  refreshMensagem(): void {
    this.mensagemService.getMensagemById(this.mensagem.id).subscribe((mensagemAtualizada) => {
      this.mensagem = mensagemAtualizada;
    });
  }
}
