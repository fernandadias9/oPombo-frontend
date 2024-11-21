import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MensagemService } from '../../service/mensagem.service';
import { ImagemService } from '../../service/imagem.service';
import { Mensagem } from '../../model/entities/mensagem';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-mensagem',
  templateUrl: './modal-mensagem.component.html',
  styleUrl: './modal-mensagem.component.scss'
})
export class ModalMensagemComponent {
  @Input() isOpen = false;
  @Output() onClose = new EventEmitter<void>();
  @Output() onSaveSuccess = new EventEmitter<{texto: string, imagem: string | File | undefined}>();

  public mensagem!: Mensagem;
  public selectedFile: File | null = null;
  public imagePreview: string | ArrayBuffer | null = null; // Para armazenar o preview da imagem

  constructor(
    private mensagemService: MensagemService,
    private imagemService: ImagemService
  ) {}

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

  uploadImagem(cartaId: number): void {
    const formData = new FormData();
    formData.append('imagem', this.selectedFile!, this.selectedFile!.name);

    this.imagemService.uploadImagem(formData).subscribe({
      next: () => {
        Swal.fire('Imagem carregada com sucesso!', '', 'success');
        this.fecharModal();
      },
      error: (erro) => {
        Swal.fire('Erro ao fazer upload da imagem: ' + erro.error, 'error');
      }
    });
  }

  salvarMensagem(): void {
    this.mensagemService.salvar(this.mensagem).subscribe(
      (resposta) => {
        Swal.fire({
          icon: 'success',
          title: 'Sucesso',
          text: 'Pruu salvo com sucesso.',
          timer: 2000,
          showConfirmButton: false
        });
        if (this.selectedFile) {
          this.uploadImagem(resposta.id); // Faz o upload da imagem
        } else {
          this.fecharModal(); // Caso não haja imagem, retornamos
        }
      },
      (erro) => {
        Swal.fire({
          icon: 'error',
          title: 'Erro',
          text: erro.message || 'Ocorreu um erro ao salvar o usuário.',
          timer: 2000,
          showConfirmButton: false
        });
      }
    )
    };

  fecharModal(): void {
    this.isOpen = false;
    this.onClose.emit();
  }
}
