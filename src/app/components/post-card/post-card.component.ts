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

  constructor(private mensagemService: MensagemService) {}

  usuarioAutenticadoCurtiu(): boolean {
    return this.mensagem.usuariosQueCurtiram.some(
      (usuario) => usuario.id === this.usuarioAutenticadoId
    );
  }

  curtir(): void {
    this.mensagemService.curtir(this.usuarioAutenticadoId, this.mensagem.id).subscribe(() => {
      this.mensagem.qtdeLikes = this.mensagem.usuariosQueCurtiram.length;
      this.refreshMensagem();
      this.usuarioAutenticadoCurtiu();
    });
  }

  refreshMensagem(): void {
    this.mensagemService.getMensagemById(this.mensagem.id).subscribe((mensagemAtualizada) => {
      this.mensagem = mensagemAtualizada;
    });
  }
}
