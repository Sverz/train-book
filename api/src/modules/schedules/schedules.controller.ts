import {
  Controller, Get, Post, Patch, Delete,
  Param, Body, Query, UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

import { SchedulesService } from './schedules.service';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { RolesGuard } from '../../guards/roles.guard';
import { Roles } from '../../decorators/roles.decorator';
import { Role } from '../../enums/role.enum';

@ApiTags('schedules')
@Controller('schedules')
export class SchedulesController {
  constructor(private service: SchedulesService) {}

  @Get()
  @ApiOperation({ summary: 'Список рейсів (з пошуком)' })
  findAll(@Query('search') search?: string) {
    return this.service.findAll(search);
  }

  @Post()
  @ApiBearerAuth()
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Створити рейс (тільки admin)' })
  create(@Body() dto: CreateScheduleDto) {
    return this.service.create(dto);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Оновити рейс (тільки admin)' })
  update(@Param('id') id: string, @Body() dto: UpdateScheduleDto) {
    return this.service.update(Number(id), dto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Видалити рейс (тільки admin)' })
  delete(@Param('id') id: string) {
    return this.service.delete(Number(id));
  }
}
