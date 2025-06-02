import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { User, UserDocument } from 'src/schemas/users.schema';
import { UsersService } from 'src/services/users.service';
import { AccessTokenGuard } from 'src/common/guards/access_token';
import { UserDto } from 'src/validations/Users.dto';

@UseGuards(AccessTokenGuard)
@Controller('users')
export class UsersController {

    constructor(private readonly userService: UsersService){}

    @Get(':id')
    async getUser (@Param('id') id: string): Promise<UserDocument | null>{
      const user = await this.userService.getById(id);

      if(!user)
        throw new NotFoundException('User not found');

      return user;
    }

    @Get()
    getAll () {
      return this.userService.getAll() || [];
    }

    @Post()
    create (@Body() user: UserDto) {
      return this.userService.create(user);
    }

    @Put() 
    update (@Param('id') id: string, @Body() user: UserDto) {
      this.userService.update(id, user)
    }

    @Delete()
    remove (@Param('id') id: string) {
      return this.userService.remove(id)
    }

    
    
}
