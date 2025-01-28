import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  OneToMany,
} from "typeorm";
import { randomUUID } from "crypto";
import { ProjectEntity } from "./project.entity";

@Entity({ name: "user" })
export class UserEntity {
  @PrimaryColumn()
  id!: string;

  @Column()
  username!: string;

  @OneToMany(() => ProjectEntity, (project) => project.user, { cascade: true })
  projects!: ProjectEntity[];

  @CreateDateColumn({ name: "created_at" }) // Cria uma coluna que registra automaticamente a data/hora de criação
  createdAt!: Date;

  @BeforeInsert()
  beforeInsert() {
    this.id = randomUUID();
  }
}
