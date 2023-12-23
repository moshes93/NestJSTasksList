import { Controller, Get, Param } from "@nestjs/common";
import { TasksService } from "./tasks.service";

@Controller('task')
export class TasksController {
    constructor(private tasksService: TasksService) {}

    @Get('list')
    getAvailableTasks() {
        return this.tasksService.getAvaiableTasks()
    }

    @Get('status/:id')
    getTaskStatusById(@Param('id') id: string) {
        return this.tasksService.getTaskStatusById(id);
    }

    @Get('result/:id')
    getTaskResultById(@Param('id') id: string) {
        return this.tasksService.getTaskResultById(id);
    }
}