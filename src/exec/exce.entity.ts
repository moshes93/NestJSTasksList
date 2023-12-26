import { Task } from "src/task/task.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { EXEC_VALUES } from "./utils/constants";

@Entity()
export class Exec {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({default: EXEC_VALUES.STATUS_DEFAULT_VALUE})
    status: string;

    @Column({ type: 'json' })
    parameters: object;

    @Column({nullable: true})
    result: string;

    @ManyToOne(() => Task, (task) => task.exec)
    task: Task
}