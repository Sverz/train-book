import { IsString, IsDateString, IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateScheduleDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  trainNumber?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  from?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  to?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  departureTime?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  arrivalTime?: string;
}
