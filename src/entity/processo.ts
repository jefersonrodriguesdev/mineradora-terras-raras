import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Processo {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    nomeEtapa?: string; // Prospecção, Extração, etc.

    @Column("text")
    descricaoTecnica?: string;
}