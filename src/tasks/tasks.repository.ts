import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './task-status.enum';
import { Task } from './task.entity';

@Injectable()
export class TasksRepository {
  constructor(
    @InjectRepository(Task)
    private repository: Repository<Task>,
  ) {}

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const { title, description } = createTaskDto;
    const task = this.repository.create({
      title,
      description,
      status: TaskStatus.OPEN,
    });
    await this.repository.save(task);
    return task;
  }

  async findOne(options: any): Promise<Task | null> {
    return this.repository.findOne(options);
  }
}
