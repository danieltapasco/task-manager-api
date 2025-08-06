import { IsOptional, IsString, IsDateString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateTaskDto {
  @ApiProperty({
    description: 'Título de la tarea',
    example: 'Escribir documentación técnica',
  })
  @IsString()
  title: string;

  @ApiPropertyOptional({
    description: 'Descripción detallada de la tarea',
    example: 'Escribir la documentación del endpoint de login',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({
    description: 'Estado de la tarea',
    example: 'pending',
    default: 'pending',
  })
  @IsOptional()
  @IsString()
  status?: string;

  @ApiPropertyOptional({
    description: 'Usuario asignado a la tarea',
    example: 'daniel',
  })
  @IsOptional()
  @IsString()
  assigned_to?: string;

  @ApiPropertyOptional({
    description: 'Fecha de vencimiento de la tarea (ISO 8601)',
    example: '2025-08-15T10:00:00Z',
  })
  @IsOptional()
  @IsDateString()
  due_date?: string;
}
