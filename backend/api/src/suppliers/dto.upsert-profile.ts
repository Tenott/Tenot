import { IsOptional, IsString } from 'class-validator';

export class UpsertSupplierProfileDto {
  @IsString()
  name!: string;

  @IsString()
  phone!: string;

  @IsOptional()
  @IsString()
  description?: string;
}
