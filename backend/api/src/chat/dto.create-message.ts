import { IsNumber, IsString } from 'class-validator';

export class CreateMessageDto {
  @IsNumber()
  listingId!: number;

  @IsNumber()
  receiverId!: number;

  @IsString()
  text!: string;
}

