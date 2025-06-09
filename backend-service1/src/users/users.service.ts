import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { User, UserDocument } from '../schemas/users.schema'
import { UserDto } from '../validations/Users.dto'

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) { }

    async create(createUserDto: UserDto): Promise<UserDocument> {
        const createdUser = new this.userModel(createUserDto);
        return createdUser.save();
    }

    async getAll(): Promise<User[]> {
        const res = await this.userModel.find().lean();
        return res;
    }

    async getById(id: string): Promise<UserDocument | null> {
        return this.userModel.findById(id);
    }

    async findByEmail(email: string): Promise<UserDocument | null> {
        return this.userModel.findOne({ email }).exec();
    }

    async update(id: string, updateUserDto: UserDto | {}): Promise<boolean> {
        await this.userModel.findByIdAndUpdate(id, {$set: updateUserDto});
        return true;
    }

    async remove(id: string): Promise<UserDocument | null> {
        return this.userModel.findByIdAndDelete(id).exec();
    }

    getByToken (token: string) {
        return this.userModel.find()
    }

}
