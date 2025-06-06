import { Injectable } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import { PassportStrategy } from "@nestjs/passport"
import {ExtractJwt, Strategy} from 'passport-jwt'

type JwtPayload = {
	sub: string,
	username: string
}

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, 'jwt') {
	constructor(configService: ConfigService) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			secretOrKey: configService.get<string>('ACCESS_TOKEN_SECRET')
		})
	}

	validate(payload: JwtPayload) {
		return payload
	}
}
