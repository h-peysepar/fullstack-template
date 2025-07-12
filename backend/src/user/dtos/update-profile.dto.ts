import { IsOptional, IsString, IsPhoneNumber, IsBoolean } from 'class-validator';

export class UpdateProfileDto {
  @IsOptional()
  @IsString()
  displayName?: string;

  @IsOptional()
  @IsPhoneNumber()
  phone?: string;

  @IsOptional()
  @IsString()
  email?: string;

  @IsOptional()
  @IsBoolean()
  shareByEmail?: boolean;

  @IsOptional()
  @IsBoolean()
  shareByPhone?: boolean;
}
