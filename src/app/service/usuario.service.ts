import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../model/entities/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private apiUrl = 'http://localhost:8080/opombo/api/usuario';

  constructor(private http: HttpClient) {}

  buscar(id: string): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.apiUrl}/${id}`);
  }

  getAuthenticatedUser(): Observable<Usuario> {
    return this.http.get<Usuario>(this.apiUrl + '/autenticado');
  }

  updateUser(user: Usuario): Observable<Usuario> {
    return this.http.put<Usuario>(this.apiUrl, user);
  }

  uploadProfileImage(formData: FormData): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/upload`, formData);
  }
}
