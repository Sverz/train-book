import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { User } from '../../entities/users.entity';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private repo: Repository<User>,
    private jwt: JwtService,
  ) { }

  async register(dto: RegisterDto) {
    const exists = await this.repo.findOne({ where: { email: dto.email } });
    if (exists) throw new ConflictException('Email вже зайнятий');

    const hash = await bcrypt.hash(dto.password, 10);
    const user = this.repo.create({ email: dto.email, password: hash });
    const saved = await this.repo.save(user);

    const { password: _, ...result } = saved;
    return result;
  }

  async login(dto: LoginDto) {
    const user = await this.repo.findOne({ where: { email: dto.email } });

    if (!user || !(await bcrypt.compare(dto.password, user.password))) {
      throw new UnauthorizedException('Невірний email або пароль');
    }

    return {
      access_token: this.jwt.sign({ sub: user.id, role: user.role }),
    };
  }
}
