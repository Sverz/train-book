import { IsString, IsDateString } from 'class-validator';

export class CreateScheduleDto {
  @IsString()
  trainNumber: string;

  @IsString()
  from: string;

  @IsString()
  to: string;

  @IsDateString()
  departureTime: string;

  @IsDateString()
  arrivalTime: string;
}