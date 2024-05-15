import { DeleteResult } from "typeorm";
import { Product } from "../../domain/product.entity";
import { BaseFilterOptions, GetAllOptions } from "common/core/repository/base.repository";

export const PRODUCT_REPOSITORY_KEY = 'PRODUCT_REPOSITORY';

export interface ProductFilterOptions extends BaseFilterOptions { }

export interface ProductRepository {
    findAll(options?: GetAllOptions<ProductFilterOptions>): Promise<[Product[], counter: number]>
    findOneById(id: number): Promise<Product>;
    create(product: Product): Promise<Product>;
    remove(id: number): Promise<DeleteResult>;
    updateOrFail(id: number, updates: Product): Promise<Product>;
}
