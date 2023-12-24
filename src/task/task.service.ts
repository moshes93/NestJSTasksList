import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { Repository } from 'typeorm';

@Injectable({})
export class TaskService {
    constructor(@InjectRepository(Task) private taskRespository: Repository<Task>) {}

    getAllAvailableTasks() {
        return this.taskRespository.find();
    }
}
