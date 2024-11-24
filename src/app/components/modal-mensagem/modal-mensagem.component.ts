import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MensagemService } from '../../service/mensagem.service';
import { ImagemService } from '../../service/imagem.service';
import { Mensagem } from '../../model/entities/mensagem';
import Swal from 'sweetalert2';
import { Usuario } from '../../model/entities/usuario';
import { UsuarioService } from '../../service/usuario.service';
import { AuthService } from '../../service/auth-service';

@Component({
  selector: 'app-modal-mensagem',
  templateUrl: './modal-mensagem.component.html',
  styleUrl: './modal-mensagem.component.scss'
})
export class ModalMensagemComponent implements OnInit {
  @Input() isOpen = false;
  @Output() onClose = new EventEmitter<void>();
  @Output() onSaveSuccess = new EventEmitter<{ texto: string, imagem: string | File | undefined }>();

  public usuarioAutenticado!: Usuario;
  public mensagem: Mensagem = {
    id: '',
    texto: '',
    publicador: this.usuarioAutenticado,
    criadoEm: '',
    qtdeLikes: 0,
    usuariosQueCurtiram: [],
    bloqueado: false
  };
  public selectedFile: File | null = null;
  public imagePreview: string | ArrayBuffer | null = null; // Para armazenar o preview da imagem

  constructor(
    private mensagemService: MensagemService,
    private imagemService: ImagemService,
    private usuarioService: UsuarioService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
  }

  // getUsuarioAutenticado(): void {
  //   const usuarioId = this.authService.getUserIdFromToken();
  //   if(usuarioId) {
  //     this.usuarioService.buscar(usuarioId).subscribe(
  //       resposta => {
  //         this.usuarioAutenticado = resposta;
  //       }
  //     )

  //   }
  // }

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
    if (!this.mensagem.texto.trim()) {
      Swal.fire('Erro', 'O texto da mensagem não pode estar vazio.', 'error');
      return;
    }

    const formData = new FormData();
    formData.append(
      'mensagem',
      new Blob([JSON.stringify(this.mensagem)], { type: 'application/json' })
    );

    if (this.selectedFile) {
      formData.append('imagem', this.selectedFile, this.selectedFile.name);
    }

    this.mensagemService.salvar(formData).subscribe({
      next: () => {
        Swal.fire('Sucesso', 'Mensagem salva com sucesso!', 'success');
        this.fecharModal();
      },
      error: (erro) => {
        Swal.fire('Erro', erro.error || 'Não foi possível salvar a mensagem.', 'error');
      },
    });
  }

  fecharModal(): void {
    this.isOpen = false;
    this.onClose.emit();
  }
}
