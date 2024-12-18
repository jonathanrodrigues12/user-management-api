import {
  BadRequestException,
  HttpException,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Repository } from 'typeorm';

import { User } from './users.entity';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './dto/update-user.dto';
import { RequestMessages } from 'src/common/requestMessages-enum';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private repo: Repository<User>,
  ) {}

  private ValidateData(email?: string, password?: string) {
    if (email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        throw new HttpException('This is not a valid email', 400);
      }
    }
    if (password) {
      const passwordRegex =
        /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      if (!passwordRegex.test(password)) {
        throw new BadRequestException(
          'Your password must be at least 8 characters long and include uppercase letters, lowercase letters, and special characters.',
        );
      }
    }
  }
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { name, email, password } = createUserDto;
    this.ValidateData(email, password);
    const existingUser = await this.repo.findOne({ where: { email } });
    if (existingUser) {
      throw new HttpException('This email already exists', 409);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = this.repo.create({
      name,
      email,
      password: hashedPassword,
    });

    return this.repo.save(user);
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    this.ValidateData(updateUserDto.email);
    const user = await this.repo.findOne({ where: { id } });

    if (!user) {
      throw new HttpException('User not found', 404);
    }
    Object.assign(user, updateUserDto);
    return await this.repo.save(user);
  }

  async softDeleteUser(id: string): Promise<any> {
    const user = await this.repo.findOne({ where: { id } });

    if (!user) {
      throw new HttpException('User not found', 404);
    }

    await this.repo.softRemove(user);
    return { message: RequestMessages.EVENT_DELETED_SUCCESSFULLY };
  }

  async restoreUser(id: string): Promise<User> {
    const user = await this.repo.findOne({
      where: { id },
      withDeleted: true,
    });

    if (!user) {
      throw new HttpException('User not found', 404);
    }
    user.deleted_at = null;
    return this.repo.save(user);
  }

  async findOneUser(id: string): Promise<User> {
    const user = await this.repo.findOne({ where: { id } });

    if (!user) {
      throw new HttpException('User not found', 404);
    }

    return user;
  }

  async findAllUsers(
    page: number,
    limit: number,
  ): Promise<{ data: User[]; total: number; page: number; limit: number }> {
    const offset = (page - 1) * limit;

    const [data, total] = await this.repo.findAndCount({
      where: { deleted_at: null },
      skip: offset,
      take: limit,
    });

    return {
      data,
      total,
      page,
      limit,
    };
  }
  async findByEmail(email: string): Promise<User | null> {
    return this.repo.findOne({ where: { email } });
  }
}
