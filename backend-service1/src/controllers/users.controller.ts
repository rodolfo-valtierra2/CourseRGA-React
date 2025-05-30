import { Controller, Get, NotFoundException, Param, Query } from '@nestjs/common';
import { User, UserDocument } from 'src/schemas/users.schema';
import { UsersService } from 'src/services/users.service';

@Controller('users')
export class UsersController {

    constructor(private readonly userService: UsersService){}

    @Get(':id')
    async getUser (@Param('id') id: string): Promise<UserDocument | null>{
      const user = await this.userService.findById(id);

      if(!user)
        throw new NotFoundException('User not found');

      return user;
    }

    @Get()
    getAll () {
      return this.userService.findAll() || [];
    }

    
    
}
