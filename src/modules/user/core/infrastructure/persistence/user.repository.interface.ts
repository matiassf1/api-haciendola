import { User } from "@user/core/domain/user.entity";
import { DeleteResult } from "typeorm";

export const USER_REPOSITORY_KEY = 'USER_REPOSITORY';

export interface UserRepository {
    findAll(): Promise<[User[], counter: number]>
    findOneByUsername(username: string): Promise<User>;
    create(user: User): Promise<User>;
    remove(id: number): Promise<DeleteResult>;
    updateOrFail(id: number, updates: User): Promise<User>;
}
