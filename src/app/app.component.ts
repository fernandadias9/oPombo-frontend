import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './service/auth-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  standalone: false,
})
export class AppComponent implements OnInit {
  title = 'OPombo_frontend';

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    const token = localStorage.getItem('tokenUsuarioAutenticado');

    if (!token) {
      this.router.navigate(['/login']);
    } 
  }
}
