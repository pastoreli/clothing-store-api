import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

@Entity()
export class ProductEntity {
  @PrimaryGeneratedColumn('increment')
  id?: string;
  @Column()
  name: string;
  @Column()
  brand: string;
  @Column()
  quantity: number;
  @Column({ type: 'float' })
  price: number;
}
