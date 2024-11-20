import { AuthService } from './../../service/auth-service';
import { Usuario } from '../../model/entities/usuario';
import { MensagemService } from '../../service/mensagem.service';
import { Mensagem } from './../../model/entities/mensagem';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrl: './post-card.component.scss'
})
export class PostCardComponent {
  @Input() mensagem!: Mensagem;
  @Input() usuarioAutenticadoId!: string;

  constructor(
    private mensagemService: MensagemService,
    private authService: AuthService
  ) {}

  usuarioAutenticadoCurtiu(): boolean {
    return this.mensagem.usuariosQueCurtiram.some(
      (usuario) => usuario.id === this.usuarioAutenticadoId
    );
  }

  curtir(): void {
    const usuarioId = this.authService.getUserIdFromToken();
    if (usuarioId) {
      this.mensagemService.curtir(usuarioId, this.mensagem.id).subscribe(() => {
        this.mensagem.qtdeLikes = this.mensagem.usuariosQueCurtiram.length;
        this.refreshMensagem();
        this.usuarioAutenticadoCurtiu();
      });
    }
  }

  refreshMensagem(): void {
    this.mensagemService.getMensagemById(this.mensagem.id).subscribe((mensagemAtualizada) => {
      this.mensagem = mensagemAtualizada;
    });
  }
}
