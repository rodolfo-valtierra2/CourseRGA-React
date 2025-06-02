import { IsAlphanumeric, IsEmail, IsString } from "class-validator";

export class SignInDto {
    @IsString()
    @IsEmail()
    email: string;
    @IsAlphanumeric()
    password: string;
}