import { Lote } from "../entity/lote";

export interface LoteRepository {
    inserir(lote: Lote): Promise<Lote>;
    listar(): Promise<Lote[]>;
    buscarPorId(id: number): Promise<Lote | undefined>;
    atualizar(id: number, lote: Lote): Promise<Lote | undefined>;
    deletar(id: number): Promise<boolean>;
}