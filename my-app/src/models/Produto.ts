import { Categoria } from "./Categoria";

export interface Produto {
    produtoId? : string;
    nome : string;
    quantidade: number;
    preco : number;
    categoriaId : number;
    categoria? : Categoria;
    criadoEm? : string;
} 