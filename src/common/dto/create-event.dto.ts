import { IsString, IsNumber } from 'class-validator';

/**
 * Data Transfer Object for creating an event.
 */
export class CreateEventDto {
  @IsString()
  readonly tenantId: string;

  @IsString()
  readonly eventType: string;

  @IsNumber()
  readonly timestamp: number;

  @IsString()
  readonly data: string;
}
