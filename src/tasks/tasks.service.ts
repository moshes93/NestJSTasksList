import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Task } from "./tasks.entity";

@Injectable({})
export class TasksService {
    constructor(@InjectRepository(Task) private taskRepository: Repository<Task>) {}
    getAvaiableTasks() {
        return this.taskRepository.find();
    }

    createTask(name: string, parameters: string) {
        const task = new Task();
        task.name = name;
        task.parameters = parameters;
        return this.taskRepository.save(task);
    }

    async getTaskStatusById(taskId: number) {
        const task = await this.taskRepository.findOne({where: {id: taskId}})
        return task;
    }

    getTaskResultById(taskId: string) {
        return `Getting result for task ${taskId}`;
    }
}