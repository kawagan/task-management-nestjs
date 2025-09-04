import { Exclude } from 'class-transformer';
import { User } from 'src/auth/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TaskStatus } from './task-status.enum';

@Entity()
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  status: TaskStatus;

  // eager: false means whenever we fetch a task, we do NOT fetch the user
  @ManyToOne(() => User, user => user.tasks, { eager: false })
  //this is not enough to exclude the user we have used transform interceptor as well
  @Exclude({ toPlainOnly: true }) // Exclude the user field when transforming to plain object
  user: User;
}
