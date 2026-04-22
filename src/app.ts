import express, { Request, Response } from 'express';
import { pokemonRotas } from './router/pokemon-router';
import { PokemonController } from './controller/lote-controller';
import { PokemonService } from './service/lote-service';
import { AppDataSource } from './data-source';
import { Pokemon } from './entity/lote';

const app = express();
app.use(express.json());

AppDataSource.initialize().then(() => {
    app.use('/uploads', express.static('my-uploads'));

    const pokemonRepository = AppDataSource.getRepository(Pokemon);
    const pokemonService = new PokemonService(pokemonRepository);
    const pokemonController = new PokemonController(pokemonService);

    app.use('/api/pokemons', pokemonRotas(pokemonController));

    app.listen(3000, () => console.log("Poké-API rodando em http://localhost:3000"));
});