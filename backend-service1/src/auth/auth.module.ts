import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';
import { ConfigService } from '@nestjs/config';
import { AccessTokenStrategy } from 'src/users/strategies/accessToken.strategy';
import { RefreshTokenStrategy } from 'src/users/strategies/refreshToken.strategy';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.ACCESS_TOKEN_SECRET,
    }),
    UsersModule,
  ],
  controllers: [AuthController],
  providers: [
    ConfigService,
    AuthService,
    AccessTokenStrategy,
    RefreshTokenStrategy,
  ],
})
export class AuthModule {}
