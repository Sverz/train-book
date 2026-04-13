import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('schedules')
export class Schedule {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  trainNumber: string;

  @Column()
  from: string;

  @Column()
  to: string;

  @Column()
  departureTime: Date;

  @Column()
  arrivalTime: Date;
}
