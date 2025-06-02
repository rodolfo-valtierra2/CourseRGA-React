import { Controller } from '@nestjs/common';
import {Body, Controller, Post, HttpCode, HttpStatus} from "@nestjs/common";
import { AuthService } from './auth.service';
import { UserDto } from 'src/validations/Users.dto';

@Controller('auth')
export class AuthController {

	constructor(private authService: AuthService) {}

	@HttpCode(HttpStatus.OK)
	@Post('login')
	signIn (@Body signInDto: UserDto) {
		return this.authService.signIn(signInDto.username, signInDto.password);
	}
}
