import { IsString, IsPhoneNumber } from 'class-validator';

export class SignupDto {
  @IsPhoneNumber()
  phone: string;

  @IsString()
  password: string;

  @IsString()
  displayName: string;
}