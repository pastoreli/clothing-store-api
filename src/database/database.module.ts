import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from 'src/product/entity/product.entity';
import { UserEntity } from 'src/user/entity/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10),
      password: process.env.DB_PASSWORD,
      username: process.env.DB_USER,
      entities: [ProductEntity, UserEntity],
      database: process.env.DB_DATABASE,
      synchronize: true,
      logging: true,
    }),
  ],
})
export class DatabaseModule {}
