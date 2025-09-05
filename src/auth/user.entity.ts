import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Task } from '../tasks/task.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  // eager: true means whenever we fetch a user, we also fetch the tasks
  @OneToMany(() => Task, task => task.user, { eager: true })
  tasks: Task[];
}
