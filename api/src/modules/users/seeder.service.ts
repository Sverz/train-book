import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from '../../entities/users.entity';
import { Role } from '../../enums/role.enum';

@Injectable()
export class SeederService implements OnModuleInit {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async onModuleInit() {
    await this.createAdmin();
    await this.createUser();
  }

  private async createAdmin() {
    const email = 'admin@gmail.com';
    if (await this.userRepo.findOne({ where: { email } })) return;
    const password = await bcrypt.hash('admin123', 10);
    await this.userRepo.save({ email, password, role: Role.ADMIN });
  }

  private async createUser() {
    const email = 'user@gmail.com';
    if (await this.userRepo.findOne({ where: { email } })) return;
    const password = await bcrypt.hash('user123', 10);
    await this.userRepo.save({ email, password, role: Role.USER });
  }
}
