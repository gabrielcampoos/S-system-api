import {
  BeforeInsert,
  Column,
  Entity,
  OneToMany,
  ManyToOne,
  PrimaryColumn,
  JoinColumn,
  PrimaryGeneratedColumn,
} from "typeorm";
import { randomUUID } from "crypto";
import { HoleEntity } from "./hole.entity";
import { UserEntity } from "./user.entity";

@Entity({ name: "project" })
export class ProjectEntity {
  @PrimaryColumn()
  id!: string;

  @Column({ name: "project_number" })
  projectNumber!: string;

  @Column()
  client!: string;

  @Column({ name: "project_alphanumeric_number" })
  projectAlphanumericNumber!: string;

  @Column({ name: "work_description" })
  workDescription!: string;

  @Column({ name: "work_site" })
  workSite!: string;

  @Column({ name: "release_date" })
  releaseDate!: Date;

  @Column({ name: "initial_date" })
  initialDate!: Date;

  @Column({ name: "final_date" })
  finalDate!: Date;

  @Column({ name: "header_text" })
  headerText!: string;

  @OneToMany(() => HoleEntity, (hole) => hole.project, { cascade: true })
  holes!: HoleEntity[];

  @ManyToOne(() => UserEntity, (user) => user.projects)
  @JoinColumn({ name: "user_id" })
  user!: UserEntity;

  @BeforeInsert()
  beforeInsert() {
    this.id = randomUUID();
  }
}
