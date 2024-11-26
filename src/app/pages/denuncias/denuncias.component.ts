import { Component } from '@angular/core';
import { DenunciaFiltro } from '../../model/filtros/denunciaFiltro';
import { Router } from '@angular/router';
import { DenunciaService } from '../../service/denuncia.service';
import { Denuncia } from '../../model/entities/denuncia';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MotivoDaDenuncia } from '../../model/enums/motivoDaDenuncia';

@Component({
  selector: 'app-denuncias',
  templateUrl: './denuncias.component.html',
  styleUrl: './denuncias.component.scss'
})
export class DenunciasComponent {
  denuncias: Denuncia[] = [];
  filtro: DenunciaFiltro = {
    pagina: 1,
    limite: 30,
  };
  paginaAtual = 1;
  totalDenuncias!: number;
  public seletor: DenunciaFiltro = new DenunciaFiltro();
  motivos = Object.keys(MotivoDaDenuncia).map(key => ({
    label: key.replace(/_/g, ' ').toLowerCase(),
    value: MotivoDaDenuncia[key as keyof typeof MotivoDaDenuncia]
  }));

  constructor(private denunciaService: DenunciaService, private router: Router) { }

  ngOnInit(): void {
    this.listarDenuncias();
  }

  public listarDenuncias(): void {
    this.denunciaService.listarComFiltro(this.filtro).subscribe(
      resultado => {
        this.denuncias = resultado;
        this.totalDenuncias = resultado.length;
      }
    );
  }

  public limpar() {
    this.seletor = new DenunciaFiltro();
  }

  abrirDetalhes(idMensagem: string, idUsuario: string): void {
    this.router.navigate([`/denuncias/${idMensagem}/${idUsuario}`]);
  }
}
