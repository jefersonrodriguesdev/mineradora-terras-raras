import { Request, Response } from "express";
import { LoteService } from "../service/lote-service";

export class LoteController {
    constructor(private service: LoteService) {}

    criar = async (req: Request, res: Response) => {
        try {
            res.status(201).json(await this.service.registrar(req.body));
        } catch (err: any) {
            res.status(err.id || 500).json({ error: err.msg });
        }
    }

    listar = async (_req: Request, res: Response) => {
        res.json(await this.service.listar());
    }

    uploadLaudo = async (req: Request, res: Response) => {
        try {
            const lote = await this.service.atualizarLaudo(+req.params.id, req.file!.filename);
            res.json(lote);
        } catch (err: any) {
            res.status(err.id || 500).json({ error: err.msg });
        }
    }
}