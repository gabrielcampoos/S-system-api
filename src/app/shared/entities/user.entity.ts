import {
  BeforeInsert,
  Column,
  Entity,
  PrimaryColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { randomUUID } from "crypto";
import { ProjectEntity } from "./project.entity";
import { HoleEntity } from "./hole.entity";

@Entity({ name: "user" })
export class UserEntity {
  @PrimaryColumn()
  id!: string;

  @Column()
  username!: string;

  @OneToMany(() => ProjectEntity, (project) => project.user, { cascade: true })
  projects!: ProjectEntity[];

  @BeforeInsert()
  beforeInsert() {
    this.id = randomUUID();
  }
}
