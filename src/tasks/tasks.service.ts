import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { Task, TaskStatus } from './task.model';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  createTask(title: string, description: string): Task {
    const task: Task = {
      id: uuidv4(),
      title,
      description,
      status: TaskStatus.OPEN,
    };
    this.tasks.push(task);
    return task;
  }

  getAllTasks(): Task[] {
    return this.tasks;
  }
}
