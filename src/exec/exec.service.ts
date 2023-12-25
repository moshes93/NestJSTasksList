import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Exec } from "./exce.entity";
import { Task } from "src/task/task.entity";
import { DatabaseActionError } from "src/exceptions/CreateExecException";

@Injectable({})
export class ExecService {
    constructor(@InjectRepository(Exec) private execRepository: Repository<Exec>) {}

    async executeTask(name: string, parameters: object) {
        try {
            const exec = new Exec();
            const task = new Task();
            task.name = name;
            exec.parameters = parameters;
            exec.task = task;
            return await this.execRepository.save(exec);
        }
        catch (e) {
            throw new DatabaseActionError('Error on creating new execution task in database', e);
        }
    }

    async updateCompletedTask(taskId: number, result: string) {
        try {
            const exec = await this.getExec(taskId);
            if (exec) {
                exec.result = result;
                exec.status = "completed";
                return this.execRepository.save(exec);
            }
        } catch (e) {
            throw new DatabaseActionError('Error on updating execution task in database', e);
        }
    }

    async getExec(execId: number) {
        const exec = await this.execRepository.findOne({where: {id: execId}})
        return exec;
    }

    async getExecStatusById(execId: number) {
        const exec = await this.getExec(execId);
        return exec.status;
    }

    async getExecResultById(execId: number) {
        const exec = await this.getExec(execId);
        return exec.result;
    }
}