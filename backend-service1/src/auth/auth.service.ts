import { BadRequestException, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { IUser } from 'src/interfaces/IUser.interface';
import { UsersService } from 'src/users/users.service';
import { UserDto } from 'src/validations/Users.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as argon2 from 'argon2';
import {SignInDto} from '../validations/SignIn.dto'
import { IToken } from 'src/interfaces/IToken.interface';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
        private configService: ConfigService,
    ) { }

    async signUp(userForm: UserDto): Promise<IUser> {
        const userExists = await this.usersService.findByEmail(userForm.email);

        if (userExists) {
            throw new BadRequestException('User already exists');
        }

        const hash = await argon2.hash(userForm.password);
        const newUser = await this.usersService.create({
            ...userForm,
            password: hash,
        });

        const tokens = await this.getTokens(newUser.id, newUser.email);
        await this.updateRefreshToken(newUser.id, tokens.refreshToken);
       
        return ({
            ...tokens,
            name: newUser.name,
            email: newUser.email,
            id: newUser._id.toString(),
        }) as unknown as IUser;
    }

    async signIn(data: SignInDto): Promise<IUser> {
        const user = await this.usersService.findByEmail(data.email);

        if (user) { //user exist
            const passwordMatches = await argon2.verify(user.password, data.password);
            if (passwordMatches){ //password match
                const tokens = await this.getTokens(user.id, user.email);
                await this.updateRefreshToken(user.id, tokens.refreshToken);
                
                return {
                    ...tokens,
                    name: user.name,
                    email: user.email,
                    id: user._id.toString(),
                } as unknown as IUser;
            } else
                throw new BadRequestException('Password is incorrect');
        } else 
            throw new BadRequestException('User does not exist');

    }

    async logout(userId: string) {
        return this.usersService.update(userId, {refreshToken: ''});
    }

    async updateRefreshToken(userId: string, refreshToken: string) {
        const hashedRefreshToken = await argon2.hash(refreshToken);
        const user = new UserDto()
        user.refreshToken = hashedRefreshToken;
        await this.usersService.update(userId, user);
    }

    async getTokens(userId: string, username: string): Promise<IToken> {
        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync(
                {
                    sub: userId,
                    username,
                },
                {
                    secret: this.configService.get<string>('ACCESS_TOKEN_SECRET'),
                    expiresIn: this.configService.get<string>('ACCESS_TOKEN_EXPIRATION'),
                },
            ),
            this.jwtService.signAsync(
                {
                    sub: userId,
                    username,
                },
                {
                    secret: this.configService.get<string>('REFRESH_TOKEN_SECRET'),
                    expiresIn: '7d',
                },
            ),
        ]);

        return {
            accessToken,
            refreshToken,
        };
    }

    async refreshTokens(
        userId: string,
        refreshToken: string,
    ): Promise<IUser> {
        const user = await this.usersService.getById(userId);

        if (user && user.refreshToken){
            const refreshTokenMatches = await argon2.verify(
                user.refreshToken,
                refreshToken,
            );

            if (refreshTokenMatches){ 
                const tokens = await this.getTokens(user.id, user.email);
                await this.updateRefreshToken(user.id, tokens.refreshToken);
                return {
                    ...tokens,
                    name: user.name,
                    email: user.email,
                    id: user._id.toString(),
                } as unknown as IUser;
            }
        }

        throw new ForbiddenException('Access Denied');
    } 
    

}
