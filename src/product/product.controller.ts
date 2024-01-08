import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductEntity } from './entity/product.entity';
import { CreateProductDto } from './dto/createProductDto';
import { UpdateProductDto } from './dto/updateProductDto';
import { AuthGuard } from 'src/middlewares/guard';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @UseGuards(AuthGuard)
  @Get()
  async getAllProducts(): Promise<ProductEntity[]> {
    return this.productService.findAll();
  }

  @Get('/:id')
  async getProductById(
    @Param('id')
    id: string,
  ): Promise<ProductEntity> {
    return this.productService.findById(id);
  }

  @Post()
  async createProduct(
    @Body()
    product: CreateProductDto,
  ): Promise<ProductEntity> {
    return this.productService.create(product);
  }

  @Put('/:id')
  async updateProduct(
    @Param('id')
    id: string,
    @Body()
    product: UpdateProductDto,
  ): Promise<ProductEntity> {
    return this.productService.update(id, product);
  }

  @Delete('/:id')
  async deleteProduct(
    @Param('id')
    id: string,
  ): Promise<ProductEntity> {
    return this.productService.delete(id);
  }
}
