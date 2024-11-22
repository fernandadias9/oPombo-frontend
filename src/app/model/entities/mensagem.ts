import { Usuario } from "./usuario";

export interface Mensagem {
  id: string;
  texto: string;
  publicador: Usuario;
  criadoEm: string;
  qtdeLikes: number;
  usuariosQueCurtiram: Usuario[];
  bloqueado: boolean;
  imagem?: string;
}