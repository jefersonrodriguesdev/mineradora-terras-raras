import { Router } from "express";
import { LoteController } from "../controller/lote-controller";
import { authMiddleware } from "../middleware/auth-middleware";
import multer from 'multer';

const upload = multer({ dest: './my-uploads' });

export const loteRotas = (controller: LoteController): Router => {
    const router = Router();

    // Rotas protegidas (Conceito A)
    router.post('/', authMiddleware, controller.criar);
    router.post('/:id/laudo', authMiddleware, upload.single('laudo'), controller.uploadLaudo);
    
    // Rota pública (apenas para visualização)
    router.get('/', controller.listar);

    return router;
};