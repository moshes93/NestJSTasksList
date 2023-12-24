import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Exec {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({default: 'pending'})
    status: string;

    @Column()
    parameters: string;

    @Column({nullable: true})
    result: string;
}