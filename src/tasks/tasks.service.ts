import { Injectable } from "@nestjs/common";

@Injectable({})
export class TasksService {
    getAvaiableTasks() {
        return ['task1', 'task2', 'task3'];
    }

    getTaskStatusById(taskId: string) {
        return `Getting status for task ${taskId}`;
    }

    getTaskResultById(taskId: string) {
        return `Getting result for task ${taskId}`;
    }
}