import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { FavoritesService } from './favorites.service';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';

@ApiTags('favorites')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('favorites')
export class FavoritesController {
  constructor(private service: FavoritesService) { }

  @Get()
  @ApiOperation({ summary: 'Мої улюблені маршрути' })
  findAll(@Request() req) {
    return this.service.findByUser(req.user.sub);
  }

  @Post(':scheduleId')
  @ApiOperation({ summary: 'Додати до улюблених' })
  add(@Request() req, @Param('scheduleId') scheduleId: string) {
    return this.service.add(req.user.sub, Number(scheduleId));
  }

  @Delete(':scheduleId')
  @ApiOperation({ summary: 'Видалити з улюблених' })
  remove(@Request() req, @Param('scheduleId') scheduleId: string) {
    return this.service.remove(req.user.sub, Number(scheduleId));
  }
}
