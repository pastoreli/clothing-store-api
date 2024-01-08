import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ProductEntity } from './entity/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private productRepository: Repository<ProductEntity>,
  ) {}

  async findAll(): Promise<ProductEntity[]> {
    try {
      return await this.productRepository.find();
    } catch (error) {
      throw new BadRequestException(error.message, { cause: error });
    }
  }

  async findById(id: string): Promise<ProductEntity> {
    try {
      const product = await this.productRepository.findOneBy({ id });
      if (!product) {
        throw new NotFoundException('Product not found.');
      }
      return product;
    } catch (error) {
      throw new BadRequestException(error.message, { cause: error });
    }
  }

  async create(product: ProductEntity): Promise<ProductEntity> {
    try {
      return await this.productRepository.save(product);
    } catch (error) {
      throw new BadRequestException(error.message, { cause: error });
    }
  }

  async update(id: string, product: ProductEntity): Promise<ProductEntity> {
    try {
      const result = await this.productRepository
        .createQueryBuilder()
        .update(ProductEntity, product)
        .where('id = :id', { id })
        .returning('*')
        .updateEntity(true)
        .execute();
      if (result.affected === 0) {
        throw new NotFoundException('Product not found.');
      }
      return result.raw[0];
    } catch (error) {
      throw new BadRequestException(error.message, { cause: error });
    }
  }

  async delete(id: string): Promise<ProductEntity> {
    try {
      const result = await this.productRepository
        .createQueryBuilder()
        .delete()
        .where('id = :id', { id })
        .returning('*')
        .execute();
      if (result.affected === 0) {
        throw new NotFoundException('Product not found.');
      }
      return result.raw[0];
    } catch (error) {
      throw new BadRequestException(error.message, { cause: error });
    }
  }
}
