import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sem-permissao',
  templateUrl: './sem-permissao.component.html',
  styleUrl: './sem-permissao.component.scss'
})
export class SemPermissaoComponent {
  constructor(private router: Router) {}

  voltarParaLogin(): void {
    localStorage.removeItem('tokenUsuarioAutenticado');
    this.router.navigate(['/login']);
  }
}
