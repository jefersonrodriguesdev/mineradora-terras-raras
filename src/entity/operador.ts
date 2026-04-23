import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Operador {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    nome?: string;

    @Column({ unique: true })
    email?: string;

    @Column()
    senha?: string;
}