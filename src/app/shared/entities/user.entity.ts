import { BeforeInsert, Column, Entity, PrimaryColumn } from "typeorm";
import { randomUUID } from "crypto";

@Entity({ name: "user" })
export class UserEntity {
  @PrimaryColumn()
  id!: string;

  @Column()
  username!: string;

  @BeforeInsert()
  beforeInsert() {
    this.id = randomUUID();
  }
}
