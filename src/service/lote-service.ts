import { Repository } from "typeorm";
import { Lote } from "../entity/lote";

export class LoteService {
    constructor(private repository: Repository<Lote>) {}

    async registrarLote(lote: Lote): Promise<Lote> {
        if (!lote.codigoIdentificacao || lote.teorMineral! < 0) {
            throw { id: 400, msg: "Dados técnicos inválidos para o mineral" };
        }
        return await this.repository.save(lote);
    }

    // Regra de Negócio (Conceito A)
    async adicionarEtapa(loteId: number, processo: any): Promise<Lote> {
        const lote = await this.repository.findOne({ where: { id: loteId }, relations: ["processosConcluidos"] });
        if (!lote) throw { id: 404, msg: "Lote não localizado" };

        // Validação: Se tentar Extração sem Licenciamento
        if (processo.nomeEtapa === "Extração") {
            const temLicenca = lote.processosConcluidos?.some(p => p.nomeEtapa === "Licenciamento ambiental");
            if (!temLicenca) {
                throw { id: 403, msg: "Violação Regulatória: Extração proibida sem Licenciamento Ambiental concluído." };
            }
        }

        lote.processosConcluidos?.push(processo);
        return await this.repository.save(lote);
    }
}c