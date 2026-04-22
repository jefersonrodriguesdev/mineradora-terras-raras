import { DataSource } from "typeorm";
import { Lote } from "./entity/lote";
import { Processo } from "./entity/processo";
import { Operador } from "./entity/operador";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "senacrs", 
    database: "mineradora-db", // Atualizado
    entities: [Lote, Processo, Operador],
    synchronize: true,
    logging: false,
})