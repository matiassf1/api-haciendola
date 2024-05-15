import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import * as XLSX from 'xlsx';
import { Product } from "modules/product/core/domain/product.entity";
import { PRODUCT_REPOSITORY_KEY, ProductRepository } from "modules/product/core/infrastructure/persistence/product.repository.interface";
import { CreateProductDto } from "modules/product/interface/dto/create-product.dto";
import { UpdateProductDto } from "modules/product/interface/dto/update-product-dto";
import { validate } from "class-validator";
import { FilterProductDto } from "modules/product/interface/dto/filter-product.dto";

@Injectable()
export class ProductService {
    constructor(
        @Inject(PRODUCT_REPOSITORY_KEY)
        private productRepository: ProductRepository,
    ) { }

    async findAll(filter: FilterProductDto): Promise<[Product[], counter: number]> {
        return await this.productRepository.findAll({ filter });
    }

    async findOneById(id: number): Promise<Product> {
        return this.productRepository.findOneById(id);
    }

    async create(productDto: CreateProductDto): Promise<Product> {
        const newProduct = this.mapDtoToEntity(productDto);
        return this.productRepository.create(newProduct);
    }

    async remove(id: number): Promise<void> {
        await this.productRepository.remove(id);
    }

    async update(id: number, updates: UpdateProductDto): Promise<void> {
        const productUpdates = this.mapDtoToEntity(updates);
        await this.productRepository.updateOrFail(id, productUpdates);
    }

    async importExcel(buffer: Buffer): Promise<void> {
        const workbook = XLSX.read(buffer, { type: 'buffer' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const products: CreateProductDto[] = XLSX.utils.sheet_to_json(worksheet);

        for (const item of products) {
            const errors = await validate(item);
            if (errors.length > 0) {
                throw new BadRequestException('Validation failed for one or more products.');
            }
            const itemNormalized = this.normalizeKeys<CreateProductDto>(item);
            console.log(itemNormalized);

            const product = this.mapDtoToEntity(itemNormalized);
            await this.productRepository.create(product);
        }
    }

    private normalizeKeys<T>(obj: T): T {
        const newObj = {} as T;
        for (const key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) {
                let newKey = key.toLowerCase().replace(/\s+/g, '');
                newKey = newKey.replace(/^(.)/, (match) => match.toLowerCase());
                newObj[newKey] = obj[key];
            }
        }
        return newObj;
    }

    private mapDtoToEntity(productDto: UpdateProductDto): Product {
        console.log(productDto);

        const { handle, title, description, sku, grams, stock, price, compareprice, barcode } = productDto;
        const product = new Product();
        product.price = !isNaN(parseFloat(price?.toString())) ? parseFloat(price?.toString()) : null;
        product.handle = handle;
        product.title = title;
        product.description = description;
        product.sku = sku;
        product.grams = grams ? parseFloat(grams?.toString()) : null;
        product.stock = stock !== undefined ? parseInt(stock?.toString(), 10) : null;
        product.compareprice = !isNaN(parseFloat(compareprice?.toString())) ? parseFloat(compareprice?.toString()) : null;
        product.barcode = barcode;
        return product;
    }
}
