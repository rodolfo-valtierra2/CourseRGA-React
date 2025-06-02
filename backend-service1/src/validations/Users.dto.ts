import { IsAlpha, IsEmail, IsString } from "class-validator";

export class UserDto {
  @IsString()
	@IsAlpha()
  name: string;
  @IsString()
	@IsEmail()
  email: string;
  @IsString()
  password: string;
  refreshToken?: string;
}
