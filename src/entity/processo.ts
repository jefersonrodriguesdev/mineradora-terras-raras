import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Processo {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    nomeEtapa?: string; // Ex: Prospecção, Extração, Refino...

    @Column("text")
    descricaoTecnica?: string;
}