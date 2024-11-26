import { TipoDeUsuario } from "../enums/tipoUsuario";

export class UsuarioDTO {
  id!: string;
  nome!: string;
  email!: string;
  cpf!: string;
  tipo!: TipoDeUsuario;
  fotoPerfil?: string | null;
}