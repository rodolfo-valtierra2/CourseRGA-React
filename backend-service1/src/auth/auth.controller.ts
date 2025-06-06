import { Body, Controller, Post, HttpCode, HttpStatus, UseGuards, Get, Req, UseInterceptors, BadRequestException } from "@nestjs/common";
import { AuthService } from './auth.service';
import { UserDto } from 'src/validations/Users.dto';
import { AuthUser } from "src/common/decorators/auth_user";
import { AccessTokenGuard } from "src/common/guards/access_token";
import { RefreshTokenGuard } from "src/common/guards/refresh_token";
import { SignInDto } from "src/validations/SignIn.dto";
import { NotFoundError } from "rxjs";

@Controller('auth')
export class AuthController {
	constructor(private authService: AuthService) { }

	@Get()
	check() {
		return "working"
	}

	@HttpCode(HttpStatus.OK)
	@Post('signup')
	signIn(@Body() signInForm: any) {
		return this.authService.signUp(signInForm)
	}

	@Post('signin')
	signin(@Body() data: any) {
		console.log(data)
		return this.authService.signIn(data);
	}

	@UseGuards(AccessTokenGuard)
	@Get('logout')
	async logout(@AuthUser('sub') sub: string, @Req() req) {
		const logout = await this.authService.logout(sub);
		delete req.Authorization

		return logout;
	}
	@UseGuards(RefreshTokenGuard)
	@Get('refresh')
	refreshTokens(
		@AuthUser('sub') sub: string,
		@AuthUser('refreshToken') refreshToken: string,
	) {
		return this.authService.refreshTokens(sub, refreshToken);
	}
}
