import { Component, OnInit } from '@angular/core';
import { Mensagem } from '../../model/entities/mensagem';
import { MensagemFiltro } from '../../model/filtros/mensagemFiltro';
import { MensagemService } from '../../service/mensagem.service';
import { PageEvent } from '@angular/material/paginator';

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
  totalMensagens: any;

  constructor(private mensagemService: MensagemService) {}

  ngOnInit(): void {
    this.carregarMensagens();
  }
  public carregarMensagens(): void {
    this.mensagemService.buscarMensagens(this.filtro).subscribe(
      resultado => {
      this.mensagens = resultado;
      this.totalMensagens = resultado.length;
    });
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

  // alterarPagina(pagina: number): void {
  //   this.filtro.pagina = pagina;
  //   this.carregarMensagens();
  // }
}
