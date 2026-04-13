import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../entities/users.entity';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { SeederService } from './seeder.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UsersService, SeederService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
