import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema, User } from '../schemas/users.schema';
import { AuthController } from '../auth/users.controller';
import { AuthService } from '../auth/users.service';

@Module({
  imports: [
    MongooseModule.forFeature([{name: User.name, schema: UserSchema}])
  ],
  controllers: [AuthController],
  providers: [UsersService],
  exports: [AuthService]
})

export class UsersModule {}
