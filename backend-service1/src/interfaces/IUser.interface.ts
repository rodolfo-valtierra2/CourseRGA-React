import {Document} from 'mongoose'

export class IUser extends Document {
    //readonly _id: string;
    readonly name: string;
    readonly password: string;
    readonly email: string;
    readonly refreshToken: string;
    readonly refreshTokenExpiration: Date;

}