import { NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, Repository } from "typeorm";
import { ProductRepository } from "./product.repository.interface";
import { ProductSchema } from "./product.schema";
import { Product } from "../../domain/product.entity";
import { FilterProductDto } from "modules/product/interface/dto/filter-product.dto";
import { GetAllOptions } from "common/core/repository/base.repository";
import { DEFAULT_TAKE, DEFAULT_SKIP } from "common/common.constants";

export class ProductMysqlRepository implements ProductRepository {
    constructor(
        @InjectRepository(ProductSchema)
        private readonly repository: Repository<Product>,
    ) { }

    async findAll(options?: GetAllOptions<FilterProductDto>): Promise<[Product[], counter: number]> {
        const { filter } = options || {};
        const queryBuilder = this.repository
            .createQueryBuilder('product')
            .take(filter?.take || DEFAULT_TAKE)
            .skip(filter?.skip || DEFAULT_SKIP);

        const [product, count] = await queryBuilder.getManyAndCount();

        return [product, count];
    }

    async findOneById(id: number): Promise<Product> {
        const product = await this.repository.findOne({
            where: { id },
        });

        if (!product) {
            throw new NotFoundException(`Product with ID ${id} not found`);
        }

        return product;
    }

    async create(product: Product): Promise<Product> {
        return this.repository.save(product);
    }

    async remove(id: number): Promise<DeleteResult> {
        const product = await this.repository.findOne({
            where: { id },
        });

        if (!product) {
            throw new NotFoundException(`Product with ID ${id} not found`);
        }

        return this.repository.delete(product);
    }

    async updateOrFail(id: number, updates: Product): Promise<Product> {
        const productToUpdate = await this.repository.preload({
            id,
            ...updates,
        });

        if (!productToUpdate) {
            throw new NotFoundException(`Product with ID ${id} not found`);
        }

        return this.repository.save(productToUpdate);
    }

}
