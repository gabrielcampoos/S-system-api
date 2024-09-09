import {
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from "typeorm";
import { randomUUID } from "crypto";
import { ProjectEntity } from "./project.entity";
import { UserEntity } from "./user.entity";
import { LayerEntity } from "./layer.entity";

@Entity({ name: "hole" })
export class HoleEntity {
  @PrimaryColumn()
  id!: string;

  @Column({ name: "hole_number" })
  holeNumber!: string;

  @Column({ name: "initial_date" })
  initialDate!: Date;

  @Column({ name: "final_date" })
  finalDate!: Date;

  @Column()
  name!: string;

  @Column({ name: "work_description" })
  workDescription!: string;

  @Column()
  quota!: string;

  @Column({ name: "water_level" })
  waterLevel!: string;

  @Column()
  interval!: string;

  @Column({ name: "water_level_two" })
  waterLevelTwo!: string;

  @Column({ name: "interval_two" })
  intervalTwo!: string;

  @Column()
  torque!: string;

  @Column()
  coating!: string;

  @Column({ name: "ultimate_digger" })
  ultimateDigger!: string;

  @Column({ name: "initial_helical" })
  initialHelical!: string;

  @Column({ name: "final_helical" })
  finalHelical!: string;

  @Column({ name: "print_spt" })
  printSpt!: string;

  @Column()
  stop!: string;

  @Column({ name: "text_poll" })
  textPoll!: string;

  @Column()
  prober!: string;

  @Column({ name: "page_lines" })
  pageLines!: string;

  @ManyToOne(() => ProjectEntity, (project) => project.holes)
  @JoinColumn({ name: "project_id" })
  project!: ProjectEntity;

  @OneToMany(() => LayerEntity, (layer) => layer.hole)
  layers!: LayerEntity[];

  @BeforeInsert()
  beforeInsert() {
    this.id = randomUUID();
  }
}
