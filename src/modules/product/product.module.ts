import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductController } from './interface/product.controller';
import { ProductService } from './application/service/product.service';
import { Product } from './core/domain/product.entity';
import { ProductMysqlRepository } from './core/infrastructure/persistence/product.mysql.repository';
import { PRODUCT_REPOSITORY_KEY } from './core/infrastructure/persistence/product.repository.interface';

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  providers: [
    ProductService,
    {
      provide: PRODUCT_REPOSITORY_KEY, useClass: ProductMysqlRepository
    }
  ],
  controllers: [ProductController],
})
export class ProductModule {}
