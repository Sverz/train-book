import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Schedule } from '../../entities/schedules.entity';
import { SchedulesService } from './schedules.service';
import { SchedulesController } from './schedules.controller';
import { SchedulesGateway } from './schedules.gateway';

@Module({
  imports: [TypeOrmModule.forFeature([Schedule])],
  providers: [SchedulesService, SchedulesGateway],
  controllers: [SchedulesController],
})
export class SchedulesModule {}
