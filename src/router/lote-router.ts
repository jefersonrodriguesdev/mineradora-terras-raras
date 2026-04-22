import { Router } from "express";
import { LoteController } from "../controller/lote-controller";
import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
    destination: './my-uploads',
    filename: (req, file, cb) => {
        cb(null, `laudo-${Date.now()}${path.extname(file.originalname)}`);
    }
});
const upload = multer({ storage });

export const loteRotas = (controller: LoteController): Router => {
    const router = Router();

    router.post('/', controller.registrar);
    router.get('/', controller.listarTodos);
    router.post('/:id/laudo', upload.single('laudo'), controller.vincularLaudo);
    router.post('/:id/processos', controller.adicionarProcesso);

    return router;
};