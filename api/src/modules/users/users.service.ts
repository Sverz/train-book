import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../entities/users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private repo: Repository<User>,
  ) {}

  findAll() {
    return this.repo.find({
      select: ['id', 'email', 'role', 'createdAt'],
      order: { createdAt: 'DESC' },
    });
  }

  findById(id: number) {
    return this.repo.findOne({
      where: { id },
      select: ['id', 'email', 'role', 'createdAt'],
    });
  }
}
