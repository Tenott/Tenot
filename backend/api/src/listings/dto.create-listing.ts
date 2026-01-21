import { IsNumber, IsString } from 'class-validator';

export class CreateListingDto {
  @IsString()
  title!: string;

  @IsString()
  article!: string;

  @IsString()
  description!: string;

  @IsNumber()
  price!: number;

  @IsNumber()
  categoryId!: number;
}
