import { Module } from '@nestjs/common';
import { UserController } from './controller/controller.controller';
import { UserService } from './service/user/user.service';

@Module({
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule 
{

}
