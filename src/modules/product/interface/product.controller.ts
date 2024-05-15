import { Controller, Get, Post, Body, Param, Delete, Patch, UseInterceptors, UploadedFile, Query } from '@nestjs/common';
import { ProductService } from '../application/service/product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { UpdateProductDto } from './dto/update-product-dto';
import { Product } from '../core/domain/product.entity';
import { PaginationDto } from 'common/pagination/pagination.dto';
import { PaginationMetaDto } from 'common/pagination/pagination-meta.dto';
import { DEFAULT_PAGE, DEFAULT_TAKE } from 'common/common.constants';
import { FilterProductDto } from './dto/filter-product.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) { }

  @Post('import')
  @UseInterceptors(FileInterceptor('file'))
  async importProducts(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
    const buffer = file.buffer;
    await this.productService.importExcel(buffer);
  }
  @Post()
  async create(@Body() createProduct: CreateProductDto) {
    return await this.productService.create(createProduct);
  }

  @Get()
  async findAll(
    @Query('filter') filter: FilterProductDto
  ): Promise<PaginationDto<Product>> {
    console.log(filter);
    const [products, count] = await this.productService.findAll(filter);
    const paginationMetaData = new PaginationMetaDto({
      itemCount: count,
      page: DEFAULT_PAGE,
      take: DEFAULT_TAKE, // when we create a DTO extending BaseFilterParamsDto this gonna change
    });
    
    return new PaginationDto(products, paginationMetaData);
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.productService.findOneById(id);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return await this.productService.remove(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateProduct: UpdateProductDto
  ) {
    return await this.productService.update(id, updateProduct);
  }
}
