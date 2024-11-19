export interface MensagemFiltro {
  texto?: string;
  idPublicador?: string;
  dataInicial?: string; 
  dataFinal?: string;
  pagina?: number;
  limite?: number;
}