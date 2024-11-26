import { TipoDeUsuario } from "../enums/tipoUsuario";

export class Usuario {
    id!: string;
    nome!: string;
    cpf!: string;
    email!: string;
    tipoUsuario!: TipoDeUsuario;
    senha!: string;
    fotoPerfil?: string | null;
}
