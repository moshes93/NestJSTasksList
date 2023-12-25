import { Exec } from "src/exec/exce.entity";
import { Column, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Task {
    @PrimaryColumn()
    name: string;

    @OneToMany(() => Exec, (exec) => exec.task)
    exec: Exec[]
}