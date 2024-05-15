import { Inject, Injectable } from "@nestjs/common";
import { User } from "@user/core/domain/user.entity";
import { CreateUserDto } from "@user/interface/dto/create-user.dto";
import { UserMysqlRepository } from "modules/user/core/infrastructure/persistence/user.mysql.repository";
import { USER_REPOSITORY_KEY } from "modules/user/core/infrastructure/persistence/user.repository.interface";
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    constructor(
        @Inject(USER_REPOSITORY_KEY)
        private userRepository: UserMysqlRepository,
    ) { }

    async findAll(): Promise<[User[], counter: number]> {
        return await this.userRepository.findAll();
    }

    findOneByUsername(username: string): Promise<User> {
        return this.userRepository.findOneByUsername(username);
    }

    async create(user: CreateUserDto): Promise<User> {
        console.log(user);
        
        const hashedPassword = await bcrypt.hash(user.password, 10);

        const newUser = new User();
        newUser.username = user.username;
        newUser.password = hashedPassword;

        return this.userRepository.create(newUser);
    }

    async remove(id: number): Promise<void> {
        await this.userRepository.remove(id);
    }
}
