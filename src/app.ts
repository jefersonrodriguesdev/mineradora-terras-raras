import express from 'express';
import { AppDataSource } from './data-source';
import { loteRotas } from './router/lote-router';
import { LoteController } from './controller/lote-controller';
import { LoteService } from './service/lote-service';
import { Lote } from './entity/lote';

const app = express();
app.use(express.json());

AppDataSource.initialize().then(() => {
    app.use('/uploads', express.static('my-uploads'));

    const loteRepo = AppDataSource.getRepository(Lote);
    const loteService = new LoteService(loteRepo);
    const loteController = new LoteController(loteService);

    app.use('/api/lotes', loteRotas(loteController));

    app.listen(3000, () => console.log("Mineradora API rodando na porta 3000"));
});