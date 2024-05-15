import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from '@user/application/service/user.service';
import { User } from "@user/core/domain/user.entity";
import { UserController } from '@user/interface/user.controller';
import { USER_REPOSITORY_KEY } from './core/infrastructure/persistence/user.repository.interface';
import { UserMysqlRepository } from './core/infrastructure/persistence/user.mysql.repository';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [
    UserService,
    {
      provide: USER_REPOSITORY_KEY, useClass: UserMysqlRepository
    }
  ],
  exports: [
    UserService,
    {
      provide: USER_REPOSITORY_KEY, useClass: UserMysqlRepository
    }
  ],
  controllers: [UserController],
})
export class UserModule { }
