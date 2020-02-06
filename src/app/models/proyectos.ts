import { Usuario } from './usuarios';

export class Proyecto {
    constructor(
        public idproyecto: number,
        public nombre: string,
        public descripcion: string,
        public usuarios: Usuario[]
    ) {
    }
}