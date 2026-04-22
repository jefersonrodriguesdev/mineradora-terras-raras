import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from "typeorm";
import { Processo } from "./processo";

@Entity()
export class Lote {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    codigoIdentificacao?: string; // Ex: TR-2026-001

    @Column("decimal")
    teorMineral?: number; // Porcentagem de terras raras

    @Column({ nullable: true })
    laudoImagem?: string; // Foto do mineral ou gráfico de análise (Recurso de Mídia - Conceito A)

    @ManyToMany(() => Processo)
    @JoinTable()
    processosConcluidos?: Processo[];
}
}