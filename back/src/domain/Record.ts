import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './User';
import { Operation } from './Operation';

@Entity()
export class Record {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  amount: number;

  @Column()
  user_balance: number;

  @Column()
  operation_response: string;

  @Column()
  date: Date;

  @ManyToOne(() => User, user => user.id)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Operation, operation => operation.id)
  @JoinColumn({ name: 'operation_id' })
  operation: Operation;
}