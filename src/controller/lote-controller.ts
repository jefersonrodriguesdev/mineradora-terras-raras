import { Request, Response } from "express";
import { LoteService } from "../service/lote-service";

export class LoteController {
    constructor(private service: LoteService) {}

    registrar = async (req: Request, res: Response) => {
        try {
            const novoLote = await this.service.registrarLote(req.body);
            res.status(201).json(novoLote);
        } catch (err: any) {
            res.status(err.id || 500).json({ error: err.msg });
        }
    }

    vincularLaudo = async (req: Request, res: Response) => {
        const { id } = req.params;
        const nomeArquivo = req.file?.filename;
        if (!nomeArquivo) return res.status(400).json({ error: "Arquivo de laudo não enviado" });

        try {
            const lote = await this.service.atualizarLaudo(+id, nomeArquivo);
            res.json({ message: "Laudo técnico vinculado com sucesso", lote });
        } catch (err: any) {
            res.status(err.id || 500).json({ error: err.msg });
        }
    }

    adicionarProcesso = async (req: Request, res: Response) => {
        try {
            const lote = await this.service.adicionarEtapa(+req.params.id, req.body.processoId);
            res.json(lote);
        } catch (err: any) {
            res.status(err.id || 500).json({ error: err.msg });
        }
    }

    listarTodos = async (_req: Request, res: Response) => {
        res.json(await this.service.listar());
    }
}