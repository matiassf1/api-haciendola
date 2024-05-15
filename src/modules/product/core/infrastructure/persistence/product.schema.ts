import { EntitySchema } from 'typeorm';
import { Product } from '../../domain/product.entity';
import { withBaseSchemaColumns } from 'common/infrastructure/persitence/base.schema';

export const ProductSchema = new EntitySchema<Product>({
    name: 'Product',
    target: Product,
    tableName: 'product',
    columns: withBaseSchemaColumns({
        handle: {
            type: 'varchar',
        },
        title: {
            type: 'varchar',
        },
        description: {
            type: 'text',
        },
        sku: {
            type: 'varchar',
        },
        grams: {
            type: 'double',
        },
        stock: {
            type: 'int',
        },
        price: {
            type: 'double',
        },
        comparePrice: {
            type: 'double',
            nullable: true,
        },
        barcode: {
            type: 'varchar',
            nullable: true,
        },
    }),
});
