import { Request, Response } from "express";
import { OperadorService } from "../service/operador-service";

export class OperadorController {
    constructor(private service: OperadorService) {}

    cadastrar = async (req: Request, res: Response) => {
        try {
            res.status(201).json(await this.service.cadastrar(req.body));
        } catch (err: any) {
            res.status(500).json({ error: "Erro ao criar operador" });
        }
    }

    login = async (req: Request, res: Response) => {
        const { email, senha } = req.body;
        try {
            const result = await this.service.login(email, senha);
            res.json(result);
        } catch (err: any) {
            res.status(err.id || 500).json({ error: err.msg });
        }
    }
}