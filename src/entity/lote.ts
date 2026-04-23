import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from "typeorm";
import { Processo } from "./processo";

@Entity()
export class Lote {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    codigoIdentificacao?: string;

    @Column("decimal")
    teorMineral?: number;

    @Column({ nullable: true })
    laudoImagem?: string;

    @ManyToMany(() => Processo)
    @JoinTable()
    processosConcluidos?: Processo[];
}