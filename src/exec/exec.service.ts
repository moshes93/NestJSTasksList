import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Exec } from "./exce.entity";
import { Task } from "src/task/task.entity";

@Injectable({})
export class ExecService {
    constructor(@InjectRepository(Exec) private execRepository: Repository<Exec>) {}

    executeTask(name: string, parameters: object) {
        const exec = new Exec();
        const task = new Task();
        task.name = name;
        exec.parameters = parameters;
        exec.task = task;
        return this.execRepository.save(exec);
    }

    async updateCompletedTask(taskId: number, result: string) {
        const exec = await this.getExec(taskId);
        if (exec) {
            exec.result = result;
            exec.status = "completed";
            return this.execRepository.save(exec);
        }
    }

    async getExec(taskId: number) {
        const exec = await this.execRepository.findOne({where: {id: taskId}})
        return exec;
    }

    async getExecStatusById(taskId: number) {
        const exec = await this.execRepository.findOne({where: {id: taskId}})
        return exec;
    }

    getExecResultById(taskId: string) {
        return `Getting result for task ${taskId}`;
    }
}