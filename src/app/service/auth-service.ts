import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../model/entities/usuario';
import { catchError, Observable, throwError } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';
import { UsuarioLoginDTO } from '../model/dto/usuarioLoginDto';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly apiUrl = 'http://localhost:8080/opombo/auth';

  constructor(private http: HttpClient, private router: Router) {}

  salvarUsuario(usuario: Usuario): Observable<Usuario> {
    return this.http
      .post<Usuario>(`${this.apiUrl}/novo-usuario`, usuario)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Ocorreu um erro desconhecido.';

    if (error.error instanceof ErrorEvent) {
      errorMessage = `Erro: ${error.error.message}`;
    } else {
      if (error.status === 400 && error.error.message) {
        errorMessage = error.error.message;
      } else {
        errorMessage = `Erro no servidor: ${error.status}`;
      }
    }
    return throwError(() => new Error(errorMessage));
  }

  autenticar(dto: UsuarioLoginDTO): Observable<HttpResponse<string>> {
    const authHeader = 'Basic ' + btoa(`${dto.login}:${dto.senha}`);
    const headers = new HttpHeaders({
      Authorization: authHeader,
    });

    return this.http.post<string>(this.apiUrl + '/authenticate', dto, {
      headers,
      observe: 'response',
      responseType: 'text' as 'json',
    },);
  }

  sair() {
    localStorage.removeItem('tokenUsuarioAutenticado');
    this.router.navigate(['/login']);
  }

  getTipoFromToken(): string | null {
    const token = localStorage.getItem('tokenUsuarioAutenticado');

    if (token) {
      const decodedToken: any = jwtDecode(token);
      return decodedToken.roles;
    }
    return null;
  }
}
