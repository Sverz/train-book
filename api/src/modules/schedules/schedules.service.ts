import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';

import { Schedule } from '../../entities/schedules.entity';
import { SchedulesGateway } from './schedules.gateway';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';

@Injectable()
export class SchedulesService {
  constructor(
    @InjectRepository(Schedule)
    private repo: Repository<Schedule>,
    private gateway: SchedulesGateway,
  ) { }

  findAll(search?: string) {
    return this.repo.find({
      where: search
        ? [
          { from: ILike(`%${search}%`) },
          { to: ILike(`%${search}%`) },
          { trainNumber: ILike(`%${search}%`) },
        ]
        : {},
      order: { departureTime: 'ASC' },
    });
  }

  async findOne(id: number) {
    const schedule = await this.repo.findOne({ where: { id } });
    if (!schedule) throw new NotFoundException('Рейс не знайдено');
    return schedule;
  }

  async create(dto: CreateScheduleDto) {
    const schedule = this.repo.create(dto);
    const result = await this.repo.save(schedule);
    this.gateway.notifyUpdate();
    return result;
  }

  async update(id: number, dto: UpdateScheduleDto) {
    await this.findOne(id);
    await this.repo.update(id, dto);
    const updated = await this.repo.findOne({ where: { id } });
    this.gateway.notifyUpdate();
    return updated;
  }

  async delete(id: number) {
    const result = await this.repo.delete(id);
    this.gateway.notifyUpdate();
    return result;
  }
}
