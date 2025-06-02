import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersController } from '../controllers/users.controller';
import { UsersService } from '../services/users.service';
import { User, UserSchema } from 'src/schemas/users.schema';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017',
          {
            dbName: 'Projects'
          }
        ),
        MongooseModule.forFeature([{name: User.name, schema: UserSchema}]),
  ],
  controllers: [UsersController],
  providers: [UsersService]
})

export class UsersModule {}
