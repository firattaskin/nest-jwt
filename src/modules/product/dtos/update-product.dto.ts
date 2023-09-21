import { IsNotEmpty } from 'class-validator';

export class UpdateProductDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  image: string;
}
