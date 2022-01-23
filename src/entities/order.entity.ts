import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';

import { Customer } from './customer.entity';
import { Product } from './product.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id?: number;

  @ManyToOne(() => Customer)
  customer: Customer;

  @OneToMany(() => OrderItem, (item) => item.order)
  items: OrderItem[];

  @Column('double')
  totalPrice: number;
}

@Entity()
export class OrderItem {
  @PrimaryGeneratedColumn()
  id?: number;

  @ManyToOne(() => Order)
  order: Order;

  @ManyToOne(() => Product)
  product: Product;

  @Column('double')
  qtd: number;

  @Column('double')
  price: number;
}
