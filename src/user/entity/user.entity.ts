import Model from 'src/shared/entity/base';
import { Entity, Column } from 'typeorm';

@Entity()
export class User extends Model {
  @Column({ type: 'varchar', length: 120 })
  public name: string;

  @Column()
  public password: string;

  @Column({ type: 'varchar', length: 120 })
  public email: string;

  @Column({ type: 'boolean', default: false })
  public isDeleted: boolean;
}
