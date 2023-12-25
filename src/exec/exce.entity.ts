import { Task } from "src/task/task.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Exec {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({default: 'pending'})
    status: string;

    @Column()
    parameters: string;

    @Column({nullable: true})
    result: string;

    @ManyToOne(() => Task, (task) => task.exec)
    task: Task
}