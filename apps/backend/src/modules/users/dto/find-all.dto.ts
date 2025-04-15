import { IsOptional, IsString, IsInt, Min } from 'class-validator';

export class FindAllUsersDto {
  @IsOptional()
  @IsInt()
  @Min(0)
  readonly skip?: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  readonly take?: number;

  @IsOptional()
  @IsString()
  readonly search?: string;
}