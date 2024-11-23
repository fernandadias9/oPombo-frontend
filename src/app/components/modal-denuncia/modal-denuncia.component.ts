import { MotivoDaDenuncia } from './../../model/enums/motivoDaDenuncia';
import Swal from 'sweetalert2';
import { DenunciaService } from './../../service/denuncia.service';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DenunciaDTO } from '../../model/dto/denunciaDto';

@Component({
  selector: 'app-modal-denuncia',
  templateUrl: './modal-denuncia.component.html',
  styleUrl: './modal-denuncia.component.scss'
})

export class ModalDenunciaComponent {
  @Input() isOpen = false;
  @Output() onClose = new EventEmitter<void>();
  @Input() dto: DenunciaDTO = new DenunciaDTO();
  @Input() motivoDaDenuncia = MotivoDaDenuncia;

  public motivosDenuncia: string[] = ['PUBLICAO_OFENSIVA', 'INFORMACAO_FALSA', 'PUBLICACAO_CALUNIOSA'];

  constructor(
    private denunciaService: DenunciaService
  ) { }

  denunciarMensagem(): void {
    if (!this.dto.motivo || !this.dto.idMensagem) {
      Swal.fire({
        icon: 'error',
        title: 'Erro',
        text: 'Por favor, selecione um motivo e certifique-se de que a mensagem está corretamente identificada.',
        timer: 2000,
        showConfirmButton: false
      });
      return;
    }

    this.denunciaService.denunciarMensagem(this.dto).subscribe(
      (resposta) => {
        Swal.fire({
          icon: 'success',
          title: 'Sucesso',
          text: 'Denúncia feita com sucesso.',
          timer: 2000,
          showConfirmButton: false
        });
      },
      (erro) => {
        Swal.fire({
          icon: 'error',
          title: 'Erro',
          text: erro.message || 'Ocorreu um erro ao denunciar mensagem.',
          timer: 2000,
          showConfirmButton: false
        });
      }
    );
  }
}
