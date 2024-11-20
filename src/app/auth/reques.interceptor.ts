import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { catchError, Observable, throwError } from "rxjs";
import { AuthService } from "../service/auth-service";

@Injectable()
export class RequestInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('Interceptando requisição:', req.url);
    const tokenUsuarioAutenticado = localStorage.getItem('tokenUsuarioAutenticado');
    let authReq = req;

    if (tokenUsuarioAutenticado) {
      authReq = req.clone({
          setHeaders: { Authorization: `Bearer ${tokenUsuarioAutenticado}` }
      });
    }

    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401 || error.status === 403) {
          this.authService.sair();
          this.router.navigate(['/login']);
        }
        return throwError(error);
      })
    );
  }
}