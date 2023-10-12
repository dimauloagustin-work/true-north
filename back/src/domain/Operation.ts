import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { OperationType } from './OperationType';

@Entity()
export class Operation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: OperationType,
  })
  type: OperationType;

  @Column()
  cost: number;
}
