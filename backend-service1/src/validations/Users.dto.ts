import { IsAlpha, IsEmail, IsString } from "class-validator";

export class UserDto {
  @IsString()
	@IsAlpha()
  name: string;
  @IsString()
  password: string;

  @IsString()
	@IsEmail()
  email: string;
  
  refreshToken?: string;
}
