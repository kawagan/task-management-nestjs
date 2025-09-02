import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import bcrypt from 'node_modules/bcryptjs';
import { Repository } from 'typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { User } from './user.entity';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(User)
    private repository: Repository<User>,
  ) {}

  async createUser(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { username, password } = authCredentialsDto;
    const existingUser = await this.repository.findOne({ where: { username } });
    if (existingUser) {
      throw new ConflictException('Username already exists');
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = this.repository.create({ username, password: hashedPassword });
    await this.repository.save(user);
  }
}
