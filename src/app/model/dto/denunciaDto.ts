import { MotivoDaDenuncia } from "../enums/motivoDaDenuncia";

export class DenunciaDTO {

  idMensagem!: string;
  idUsuario!: string;
  motivo!: MotivoDaDenuncia;
  dataDenuncia!: Date;
  nomeDenunciante!: string;
  conteudoMensagem!: string;
}