import { EntitySchema } from 'typeorm';
import { User } from '@user/core/domain/user.entity';
import { withBaseSchemaColumns } from 'common/infrastructure/persitence/base.schema';

export const UserSchema = new EntitySchema<User>({
    name: 'User',
    target: User,
    tableName: 'user',
    columns: withBaseSchemaColumns({
        username: {
            type: String,
            unique: true,
        },
        password: {
            type: String,
            nullable: true,
        },
    }),
});
