import { Body, Controller, Post, HttpCode, HttpStatus, UseGuards, Get } from "@nestjs/common";
import { AuthService } from './auth.service';
import { UserDto } from 'src/validations/Users.dto';
import { AuthUser } from "src/common/decorators/auth_user";
import { AccessTokenGuard } from "src/tokenAccess/guard.access_token";
import { RefreshTokenGuard } from "src/common/guards/refresh_token";
import { SignInDto } from "src/validations/SignIn.dto";

@Controller('auth')
export class AuthController {

	constructor(private authService: AuthService) { }

	@HttpCode(HttpStatus.OK)
	@Post('login')
	signIn(@Body() signInForm: UserDto) {
		return this.authService.signIn(signInForm);
	}

	@Post('signin')
	signin(@Body() data: SignInDto) {
		return this.authService.signIn(data);
	}

	@UseGuards(AccessTokenGuard)
	@Get('logout')
	logout(@AuthUser('sub') sub: string) {
		return this.authService.logout(sub);
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
