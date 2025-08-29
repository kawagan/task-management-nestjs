import { Injectable } from '@nestjs/common';

@Injectable()
export class TasksService {
    private tasks: any[] = [];

    createTask(task: any) {
        this.tasks.push(task);
    }

    getAllTasks() {
        return this.tasks;
    }
}
