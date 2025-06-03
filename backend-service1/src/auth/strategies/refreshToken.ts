import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import {Strategy, ExtractJwt} from 'passport-jwt'
import {Request} from 'express'

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(Strategy, 'jwt-refresh'){
	constructor(configService: ConfigService) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			secrteOrKey: configService.get<string>('REFRESH_TOKEN_SECRET'),
			passReqToCallback: true
		})
	}

	validate(req: Request, payload:any) {
		const refreshToken = req.get('Authorization')?.replace('bearer','').trim();
		return {...payload, refreshToken}
	}

}
