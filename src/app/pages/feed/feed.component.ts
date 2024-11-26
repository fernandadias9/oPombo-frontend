import { MensagemFiltro } from './../../model/filtros/mensagemFiltro';
import { Component, OnInit } from '@angular/core';
import { Mensagem } from '../../model/entities/mensagem';
import { MensagemService } from '../../service/mensagem.service';
import { PageEvent } from '@angular/material/paginator';
import { ListaMensagensDTO } from '../../model/dto/mensagemDto';
import { AuthService } from '../../service/auth-service';
import { UsuarioService } from '../../service/usuario.service';
import { Usuario } from '../../model/entities/usuario';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.scss'
})

export class FeedComponent implements OnInit {
  mensagens: Mensagem[] = [];
  filtro: MensagemFiltro = {
    texto: '',
    idUsuario: '',
    nomePublicador: '',
    dataInicial: '',
    dataFinal: '',
    curtido: false,
    pagina: 1,
    limite: 30
  };
  paginaAtual = 1;
  totalMensagens!: number;
  modalAberto = false;
  usuarioAutenticado!: Usuario;
  isAuthenticated: boolean = false;
  router: any;

  constructor(
    private mensagemService: MensagemService,
    private usuarioService: UsuarioService) { }

  ngOnInit(): void {
    this.carregarMensagens();
    this.usuarioService.getAuthenticatedUser().subscribe({
      next: (data) => {
        this.usuarioAutenticado = data;
        this.isAuthenticated = true;
      },
      error: (error) => {
        console.error('Erro ao obter usuário autenticado', error);
        this.isAuthenticated = false;
        this.router.navigate(['/login']);
      }
    });
  }

  public carregarMensagens(): void {
    this.mensagemService.buscarMensagens(this.filtro).subscribe(
      resultado => {
        this.mensagens = resultado;
        this.totalMensagens = resultado.length;
      }
    );
  }

  onPaginaMudou(event: PageEvent): void {
    this.filtro.pagina = event.pageIndex + 1;
    this.filtro.limite = event.pageSize;
    this.carregarMensagens();
  }

  aplicarFiltro(): void {
    this.filtro.pagina = 1;
    this.carregarMensagens();
  }

  abrirModalCriarPruu(): void {
    this.modalAberto = true;
  }

  fecharModal(): void {
    this.modalAberto = false;
  }

  public limpar() {
    this.filtro = new MensagemFiltro();
  }

  toggleCurtida(event: any) {
    const isCurtido = event.target.checked;
    this.filtro.curtido = isCurtido;
    this.filtro.idUsuario = isCurtido ? this.usuarioAutenticado.id : '';
  }
}
