import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Mensagem } from '../model/entities/mensagem';
import { MensagemFiltro } from '../model/filtros/mensagemFiltro';
import { ListaMensagensDTO } from '../model/dto/mensagemDto';

@Injectable({
  providedIn: 'root',
})
export class MensagemService {
  private readonly apiUrl = 'http://localhost:8080/opombo/api/mensagem';

  constructor(private http: HttpClient) {}

  buscarMensagens(filtro: MensagemFiltro): Observable<Mensagem[]> {
    return this.http.post<Mensagem[]>(`${this.apiUrl}/filtro`, filtro);
  }

  curtir(idUsuario: string, idMensagem: string): Observable<void> {
    return this.http.put<void>(
      `${this.apiUrl}/curtir/${idUsuario}/${idMensagem}`,
      {}
    );
  }

  getMensagemById(id: string): Observable<Mensagem> {
    return this.http.get<Mensagem>(`${this.apiUrl}/${id}`);
  }

  listarMensagens(): Observable<ListaMensagensDTO[]> {
    return this.http.get<ListaMensagensDTO[]>(`${this.apiUrl}`);
  }

}
