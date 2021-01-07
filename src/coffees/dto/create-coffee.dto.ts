import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateCoffeeDto {
  @ApiProperty({ description: 'The name of a coffee.' })
  @IsString()
  readonly name: string;

  @ApiProperty({ description: 'The breand of a coffee.' })
  @IsString()
  readonly brand: string;

  @ApiProperty({ example: [] })
  @IsString({ each: true })
  readonly flavors: string[];
}
