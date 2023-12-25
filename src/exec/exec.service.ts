import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Exec } from "./exce.entity";

@Injectable({})
export class ExecService {
    constructor(@InjectRepository(Exec) private execRepository: Repository<Exec>) {}
    // getAvaiableTasks() {
    //     return this.execRepository.find();
    // }

    executeTask(name: string, parameters: string) {
        const exec = new Exec();
        exec.parameters = parameters;
        return this.execRepository.save(exec);
    }

    async getTaskStatusById(taskId: number) {
        const task = await this.execRepository.findOne({where: {id: taskId}})
        return task;
    }

    getTaskResultById(taskId: string) {
        return `Getting result for task ${taskId}`;
    }
}