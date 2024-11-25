import { Component } from '@angular/core';
import { Denuncia } from '../../model/entities/denuncia';
import { ActivatedRoute, Router } from '@angular/router';
import { DenunciaService } from '../../service/denuncia.service';
import { jwtDecode } from 'jwt-decode';
import { MensagemService } from '../../service/mensagem.service';

@Component({
  selector: 'app-denuncia-detalhe',
  templateUrl: './denuncia-detalhe.component.html',
  styleUrl: './denuncia-detalhe.component.scss'
})
export class DenunciaDetalheComponent {
  denuncia!: Denuncia;

  constructor(
    private route: ActivatedRoute,
    private denunciaService: DenunciaService,
    private router: Router,
    private mensagemService: MensagemService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.denunciaService.buscar(id).subscribe((data) => {
      this.denuncia = data;
    });
  }

  aceitarDenuncia(): void {
    this.mensagemService.bloquear(this.denuncia.mensagem.id).subscribe(() => {
      this.denuncia.foiAnalisada = true;
      this.atualizarDenuncia();
    });
  }

  recusarDenuncia(): void {
    this.denuncia.foiAnalisada = true;
    this.atualizarDenuncia();
  }

  private atualizarDenuncia(): void {
    this.denunciaService.atualizar(this.denuncia).subscribe(() => {
      this.router.navigate(['/denuncias']);
    });
  }
}
