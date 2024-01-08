import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductEntity } from './entity/product.entity';
import { tokenModuleConfig } from 'src/utils/token';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity]), ...tokenModuleConfig],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
