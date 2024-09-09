import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export class CreateProfundities1725045412960 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "profundities",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
            generationStrategy: "uuid",
            default: "uuid_generate_v4()",
          },
          {
            name: "profundity0",
            type: "float",
            isNullable: true,
          },
          {
            name: "spt",
            type: "float",
          },
          {
            name: "hit1",
            type: "float",
            isNullable: true,
          },
          {
            name: "profundity1",
            type: "float",
            isNullable: true,
          },
          {
            name: "hit2",
            type: "float",
            isNullable: true,
          },
          {
            name: "profundity2",
            type: "float",
            isNullable: true,
          },
          {
            name: "hit3",
            type: "float",
            isNullable: true,
          },
          {
            name: "profundity3",
            type: "float",
            isNullable: true,
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("profundities");
  }
}
