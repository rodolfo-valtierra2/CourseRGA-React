import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User, UserSchema } from 'src/schemas/users.schema';

@Module({
  imports: [
		MongooseModule.forFeature([{name: User.name, schema: UserSchema}]),
  ],
  controllers: [UsersController],
  providers: [User, UsersService]
})

export class UsersModule {}
