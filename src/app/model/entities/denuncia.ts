import { MotivoDaDenuncia } from "../enums/motivoDaDenuncia";
import { DenunciaPK } from "./denunciaPk";
import { Mensagem } from "./mensagem";
import { Usuario } from "./usuario";

export class Denuncia {
  id!: DenunciaPK;
  mensagem!: Mensagem;
  usuario!: Usuario;
  data!: Date;
  motivo!: MotivoDaDenuncia;
  foiAnalisada!: boolean;
}

