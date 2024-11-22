import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImagemService {

  private readonly apiUrl = 'http://localhost:8080/opombo/api/imagem';

  constructor(private http: HttpClient) {}

  uploadImagem(formData: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/upload`, formData);
  }
}
