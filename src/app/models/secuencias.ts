import { Pictograma } from './pictogramas';

export class Secuencia {
  constructor(public idsecuencia: number, public nombre: string, public acciones: Pictograma[]) {}
}
