import { Repository } from "typeorm";
import { Lote } from "../entity/lote";

export class LoteService {
    constructor(private repository: Repository<Lote>) {}

    async registrar(lote: Lote): Promise<Lote> {
        return await this.repository.save(lote);
    }

    async listar(): Promise<Lote[]> {
        return await this.repository.find({ relations: ["processosConcluidos"] });
    }

    async atualizarLaudo(id: number, arquivo: string): Promise<Lote> {
        const lote = await this.repository.findOneBy({ id });
        if (!lote) throw { id: 404, msg: "Lote não encontrado" };
        lote.laudoImagem = arquivo;
        return await this.repository.save(lote);
    }

    // Regra de Negócio: Não permite Extração sem Licenciamento Ambiental
    async adicionarEtapa(loteId: number, processo: any): Promise<Lote> {
        const lote = await this.repository.findOne({ where: { id: loteId }, relations: ["processosConcluidos"] });
        if (!lote) throw { id: 404, msg: "Lote não localizado" };

        if (processo.nomeEtapa === "Extração (mineração)") {
            const temLicenca = lote.processosConcluidos?.some(p => p.nomeEtapa === "Licenciamento ambiental");
            if (!temLicenca) throw { id: 403, msg: "Proibido: Extração requer Licenciamento Ambiental prévio." };
        }

        lote.processosConcluidos?.push(processo);
        return await this.repository.save(lote);
    }
}