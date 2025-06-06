import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";


@Injectable()
export class RefreshToken extends AuthGuard('jwt-refresh') {}