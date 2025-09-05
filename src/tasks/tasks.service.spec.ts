import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { User } from '../auth/user.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatus } from './task-status.enum';
import { Task } from './task.entity';
import { TasksRepository } from './tasks.repository';
import { TasksService } from './tasks.service';

const mockTasksRepository = () => ({
  getTasks: jest.fn(),
  createTask: jest.fn(),
  findOne: jest.fn(),
  delete: jest.fn(),
  save: jest.fn(),
});

const mockUser: User = {
  id: 'user-1',
  username: 'testuser',
  password: 'hashedpassword',
  tasks: [],
};

const mockTask: Task = {
  id: 'task-1',
  title: 'Test Task',
  description: 'Test Description',
  status: TaskStatus.OPEN,
  user: mockUser,
};

describe('TasksService', () => {
  let service: TasksService;
  let repository: any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasksService,
        {
          provide: TasksRepository,
          useFactory: mockTasksRepository,
        },
      ],
    }).compile();

    service = module.get<TasksService>(TasksService);
    repository = module.get<TasksRepository>(TasksRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getTasks', () => {
    it('should get all tasks from the repository', async () => {
      const filterDto: GetTasksFilterDto = { status: TaskStatus.OPEN };
      repository.getTasks.mockResolvedValue([mockTask]);

      const result = await service.getTasks(filterDto, mockUser);

      expect(repository.getTasks).toHaveBeenCalledWith(filterDto, mockUser);
      expect(result).toEqual([mockTask]);
    });
  });

  describe('createTask', () => {
    it('should create a task successfully', async () => {
      const createTaskDto: CreateTaskDto = {
        title: 'Test Task',
        description: 'Test Description',
      };
      repository.createTask.mockResolvedValue(mockTask);

      const result = await service.createTask(createTaskDto, mockUser);

      expect(repository.createTask).toHaveBeenCalledWith(
        createTaskDto,
        mockUser,
      );
      expect(result).toEqual(mockTask);
    });
  });

  describe('getTaskById', () => {
    it('should retrieve a task with an ID', async () => {
      repository.findOne.mockResolvedValue(mockTask);

      const result = await service.getTaskById('task-1', mockUser);

      expect(repository.findOne).toHaveBeenCalledWith({
        where: { id: 'task-1', user: mockUser },
      });
      expect(result).toEqual(mockTask);
    });

    it('should throw an error if task is not found', async () => {
      repository.findOne.mockResolvedValue(null);

      await expect(
        service.getTaskById('non-existent-id', mockUser),
      ).rejects.toThrow(NotFoundException);
      await expect(
        service.getTaskById('non-existent-id', mockUser),
      ).rejects.toThrow('Task with ID "non-existent-id" not found');
    });

    it('should throw an error if ID is not provided', async () => {
      await expect(service.getTaskById('', mockUser)).rejects.toThrow(
        NotFoundException,
      );
      await expect(service.getTaskById('', mockUser)).rejects.toThrow(
        'Task ID is required',
      );
    });

    it('should throw an error if ID is null or undefined', async () => {
      await expect(service.getTaskById(null as any, mockUser)).rejects.toThrow(
        NotFoundException,
      );
      await expect(
        service.getTaskById(undefined as any, mockUser),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('deleteTask', () => {
    it('should delete a task successfully', async () => {
      repository.findOne.mockResolvedValue(mockTask);
      repository.delete.mockResolvedValue({ affected: 1 });

      await service.deleteTask('task-1', mockUser);

      expect(repository.findOne).toHaveBeenCalledWith({
        where: { id: 'task-1', user: mockUser },
      });
      expect(repository.delete).toHaveBeenCalledWith('task-1');
    });

    it('should throw an error if task to delete is not found', async () => {
      repository.findOne.mockResolvedValue(null);

      await expect(
        service.deleteTask('non-existent-id', mockUser),
      ).rejects.toThrow(NotFoundException);
      expect(repository.delete).not.toHaveBeenCalled();
    });
  });

  describe('updateTaskStatus', () => {
    it('should update task status successfully', async () => {
      const updatedTask = { ...mockTask, status: TaskStatus.IN_PROGRESS };
      repository.findOne.mockResolvedValue(mockTask);
      repository.save.mockResolvedValue(updatedTask);

      const result = await service.updateTaskStatus(
        'task-1',
        TaskStatus.IN_PROGRESS,
        mockUser,
      );

      expect(repository.findOne).toHaveBeenCalledWith({
        where: { id: 'task-1', user: mockUser },
      });
      expect(repository.save).toHaveBeenCalledWith({
        ...mockTask,
        status: TaskStatus.IN_PROGRESS,
      });
      expect(result.status).toEqual(TaskStatus.IN_PROGRESS);
    });

    it('should throw an error if task to update is not found', async () => {
      repository.findOne.mockResolvedValue(null);

      await expect(
        service.updateTaskStatus(
          'non-existent-id',
          TaskStatus.IN_PROGRESS,
          mockUser,
        ),
      ).rejects.toThrow(NotFoundException);
      expect(repository.save).not.toHaveBeenCalled();
    });

    it('should update task status to DONE', async () => {
      const updatedTask = { ...mockTask, status: TaskStatus.DONE };
      repository.findOne.mockResolvedValue(mockTask);
      repository.save.mockResolvedValue(updatedTask);

      const result = await service.updateTaskStatus(
        'task-1',
        TaskStatus.DONE,
        mockUser,
      );

      expect(result.status).toEqual(TaskStatus.DONE);
    });
  });
});
