import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
  BeforeInsert,
  PrimaryColumn,
} from "typeorm";
import { HoleEntity } from "./hole.entity";
import { ProfundityEntity } from "./profundity.entity";
import { randomUUID } from "crypto";

@Entity({ name: "layer" })
export class LayerEntity {
  @PrimaryColumn("uuid")
  id!: string;

  @Column({ name: "project_number" })
  projectNumber!: number;

  @Column({ name: "code" })
  code!: number;

  @Column("float", { name: "depth" })
  depth!: number;

  @Column({ name: "type" })
  type!: string;

  @Column({ name: "description" })
  description!: string;

  @Column({ name: "hatch" })
  hatch!: string;

  @ManyToOne(() => HoleEntity, (hole) => hole.layers, { onDelete: "CASCADE" })
  @JoinColumn({ name: "hole_id" })
  hole!: HoleEntity;

  @BeforeInsert()
  beforeInsert() {
    this.id = randomUUID();
  }
}
