import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("profundities")
export class ProfundityEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column("float")
  profundity0?: number;

  @Column("float")
  spt?: number;

  @Column("float", { nullable: true })
  hit1?: number;

  @Column("float", { nullable: true })
  profundity1?: number;

  @Column("float", { nullable: true })
  hit2?: number;

  @Column("float", { nullable: true })
  profundity2?: number;

  @Column("float", { nullable: true })
  hit3?: number;

  @Column("float", { nullable: true })
  profundity3?: number;
}
