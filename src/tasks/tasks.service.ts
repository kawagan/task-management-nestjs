import { Injectable } from '@nestjs/common';
import { Task } from './task.model';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  createTask(task: any) {
    this.tasks.push(task);
  }

  getAllTasks(): Task[] {
    return this.tasks;
  }
}
