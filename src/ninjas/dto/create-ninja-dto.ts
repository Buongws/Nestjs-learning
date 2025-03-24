import { IsEnum, MinLength } from 'class-validator';

export class CreateNinjaDto {
  @MinLength(3)
  name: string;
  @IsEnum(['stars', 'nunchucks', 'Nunchaku'], {
    message: 'Weapon must be either stars, nunchucks, or Nunchaku',
  })
  weapon: 'stars' | 'nunchucks' | 'Nunchaku';
}
