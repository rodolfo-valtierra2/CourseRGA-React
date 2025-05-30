import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import {User, UserDocument} from '../schemas/users.schema'
import {UserDto} from '../validations/Users.dto'

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument> ){}

    findById (id: string): Promise<UserDocument | null> {
        return this.userModel.findById(id);
    }

    findAll () {
        return this.userModel.find();
    }
    
}
