import { NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "@user/core/domain/user.entity";
import { DeleteResult, Repository } from "typeorm";
import { UserSchema } from "./user.schema";
import { UserRepository } from "./user.repository.interface";

export class UserMysqlRepository implements UserRepository {
    constructor(
        @InjectRepository(UserSchema)
        private readonly repository: Repository<User>,
    ) { }

    async findAll(): Promise<[User[], counter: number]> {
        return this.repository.findAndCount();
    }

    async findOneByUsername(username: string): Promise<User> {
        const user = await this.repository.findOne({
            where: { username },
        });

        if (!user) {
            throw new NotFoundException(`User with username ${username} not found`);
        }

        return user;
    }

    async create(newUser: User): Promise<User> {
        const username = newUser.username;
        const user = await this.repository.findOne({
            where: { username },
        });
        console.log(user);

        if (user) {
            throw new NotFoundException(`User with username ${user.username} already exists`);
        }

        return this.repository.save(newUser);
    }

    async remove(id: number): Promise<DeleteResult> {
        const user = await this.repository.findOne({
            where: { id },
        });

        if (!user) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }

        return this.repository.delete(user);
    }

    async updateOrFail(id: number, updates: User): Promise<User> {
        const userToUpdate = await this.repository.preload({
            id,
            ...updates,
        });

        if (!userToUpdate) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }

        return this.repository.save(userToUpdate);
    }

}
