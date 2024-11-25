import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsuarioService } from '../../service/usuario.service';
import { Usuario } from '../../model/entities/usuario';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.scss'
})
export class PerfilComponent implements OnInit {
  user!: Usuario;
  profileForm!: FormGroup;
  isEditMode: boolean = false;

  constructor(
    private usuarioService: UsuarioService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.usuarioService.buscar(this.user.id).subscribe(user => {
      this.user = user;
      this.initializeForm();
    });
  }

  initializeForm(): void {
    this.profileForm = this.fb.group({
      nome: [{ value: this.user.nome, disabled: !this.isEditMode }],
      email: [{ value: this.user.email, disabled: !this.isEditMode }],
      cpf: [{ value: this.user.cpf, disabled: true }],
      senha: [{ value: this.user.senha, disabled: true }]
    });
  }

  toggleEditMode(): void {
    this.isEditMode = !this.isEditMode;
    this.initializeForm();
  }

  uploadProfilePicture(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.usuarioService.uploadProfileImage(file).subscribe(response => {
        this.user.fotoPerfil = response;
      });
    }
  }

  saveProfile(): void {
    const updatedUser = this.profileForm.value;
    this.usuarioService.updateUser(updatedUser).subscribe(() => {
      this.isEditMode = false;
      this.initializeForm();
    });
  }
}
