import { Repository } from "typeorm";
import { Operador } from "../entity/operador";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export class OperadorService {
    private SECRET_KEY = "minera-secret-key-2026"; // Em produção, use variáveis de ambiente

    constructor(private repository: Repository<Operador>) {}

    async cadastrar(dados: Operador): Promise<Operador> {
        // Criptografia da senha antes de salvar (Conceito A)
        const salt = await bcrypt.genSalt(10);
        dados.senha = await bcrypt.hash(dados.senha!, salt);
        return await this.repository.save(dados);
    }

    async login(email: string, senhaPlana: string): Promise<{ token: string, operador: any }> {
        const operador = await this.repository.findOneBy({ email });
        
        if (!operador) throw { id: 401, msg: "Credenciais inválidas" };

        const senhaValida = await bcrypt.compare(senhaPlana, operador.senha!);
        if (!senhaValida) throw { id: 401, msg: "Credenciais inválidas" };

        // Geração do Token JWT (Conceito B)
        const token = jwt.sign({ id: operador.id, email: operador.email }, this.SECRET_KEY, { expiresIn: '8h' });
        
        const { senha, ...operadorSemSenha } = operador;
        return { token, operador: operadorSemSenha };
    }
}