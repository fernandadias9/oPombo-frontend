import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Denuncia } from '../model/entities/denuncia';
import { DenunciaDTO } from '../model/dto/denunciaDto';
import { DenunciaFiltro } from '../model/filtros/denunciaFiltro';

@Injectable({
  providedIn: 'root'
})
export class DenunciaService {

  private readonly apiUrl = 'http://localhost:8080/opombo/api/denuncia';

  constructor(private http: HttpClient) { }

  denunciarMensagem(denunciaDTO: DenunciaDTO): Observable<any> {
    return this.http.post(this.apiUrl, denunciaDTO);
  }

  atualizar(denuncia: Denuncia): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/atualizar`, denuncia);
  }

  // Buscar denúncia pelo ID
  buscar(id: string): Observable<Denuncia> {
    return this.http.get<Denuncia>(`${this.apiUrl}/${id}`);
  }

  // Listar todas as denúncias (como DTO)
  listarDTO(): Observable<DenunciaDTO[]> {
    return this.http.get<DenunciaDTO[]>(`${this.apiUrl}`);
  }

  // Listar todas as denúncias completas
  listar(): Observable<Denuncia[]> {
    return this.http.get<Denuncia[]>(`${this.apiUrl}/todas`);
  }

  listarComFiltro(filtro: DenunciaFiltro): Observable<Denuncia[]> {
    return this.http.post<Denuncia[]>(`${this.apiUrl}/filtro`, filtro);
  }

  // // Pesquisar denúncias com filtro
  // pesquisarComFiltro(filtro: DenunciaFiltro): Observable<Denuncia[]> {
  //   return this.http.post<Denuncia[]>(`${this.apiUrl}/filtro`, filtro);
  // }

  // Buscar denúncias por mensagem
  buscarDenunciasPorMensagem(idMensagem: string): Observable<Denuncia[]> {
    return this.http.get<Denuncia[]>(`${this.apiUrl}/mensagem/${idMensagem}`);
  }
}
