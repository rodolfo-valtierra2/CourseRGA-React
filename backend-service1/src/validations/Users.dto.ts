import { Prop, SchemaFactory } from "@nestjs/mongoose";
import { IsString } from "class-validator";

export class UserDto {
  @IsString()
  name: string;
  @IsString()
  email: string;
  @IsString()
  password: string;
  refreshToken?: string;
}