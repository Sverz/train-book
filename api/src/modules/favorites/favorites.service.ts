import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Favorite } from '../../entities/favorites.entity';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(Favorite)
    private repo: Repository<Favorite>,
  ) { }

  findByUser(userId: number) {
    return this.repo.find({ where: { userId } });
  }

  async add(userId: number, scheduleId: number) {
    const exists = await this.repo.findOne({ where: { userId, scheduleId } });
    if (exists) throw new ConflictException('Вже в улюблених');
    return this.repo.save(this.repo.create({ userId, scheduleId }));
  }

  remove(userId: number, scheduleId: number) {
    return this.repo.delete({ userId, scheduleId });
  }
}
