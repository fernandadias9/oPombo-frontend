import { MensagemFiltro } from './../../model/filtros/mensagemFiltro';
import { Component, OnInit } from '@angular/core';
import { Mensagem } from '../../model/entities/mensagem';
import { MensagemService } from '../../service/mensagem.service';
import { PageEvent } from '@angular/material/paginator';
import { ListaMensagensDTO } from '../../model/dto/mensagemDto';
import { AuthService } from '../../service/auth-service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.scss'
})
export class FeedComponent implements OnInit {
  mensagens: Mensagem[] = [];
  filtro: MensagemFiltro = {
    pagina: 1,
    limite: 30,
  };
  paginaAtual = 1;
  totalMensagens!: number;
  modalAberto = false;
  public seletor: MensagemFiltro = new MensagemFiltro();

  constructor(private mensagemService: MensagemService) {}

  ngOnInit(): void {
    this.carregarMensagens();
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
    this.seletor = new MensagemFiltro();
  }

  // carregarMensagens(): void {
  //   this.mensagemService.listarMensagens().subscribe((mensagens) => {
  //     this.mensagens = mensagens;
  //   });
  // }


  // alterarPagina(pagina: number): void {
  //   this.filtro.pagina = pagina;
  //   this.carregarMensagens();
  // }
}
