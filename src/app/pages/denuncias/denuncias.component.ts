import { Component } from '@angular/core';
import { DenunciaFiltro } from '../../model/filtros/denunciaFiltro';
import { Router } from '@angular/router';
import { DenunciaService } from '../../service/denuncia.service';
import { Denuncia } from '../../model/entities/denuncia';

@Component({
  selector: 'app-denuncias',
  templateUrl: './denuncias.component.html',
  styleUrl: './denuncias.component.scss'
})
export class DenunciasComponent {
  denuncias: Denuncia[] = [];
  filtro = new DenunciaFiltro();

  constructor(private denunciaService: DenunciaService, private router: Router) {}

  ngOnInit(): void {
    this.buscarDenuncias();
  }

  buscarDenuncias(): void {
    this.denunciaService.listarComFiltro(this.filtro).subscribe((data) => {
      this.denuncias = data;
    });
  }

  abrirDetalhes(idMensagem: string, idUsuario: string): void {
    this.router.navigate([`/denuncias/${idMensagem}/${idUsuario}`]);
  }
}
