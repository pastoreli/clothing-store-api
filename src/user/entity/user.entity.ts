import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn('increment')
  id?: string;
  @Column()
  userName: string;
  @Column()
  password: string;
}
