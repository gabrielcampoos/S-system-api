import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export class CreateTableHole1715017919348 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "hole",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
            generationStrategy: "uuid",
            default: "uuid_generate_v4()", // Ajuste conforme o banco de dados
          },
          {
            name: "hole_number",
            type: "varchar",
            length: "50",
          },
          {
            name: "initial_date",
            type: "date",
          },
          {
            name: "final_date",
            type: "date",
          },
          {
            name: "name",
            type: "varchar",
            length: "255",
          },
          {
            name: "work_description",
            type: "varchar",
            length: "255",
          },
          {
            name: "quota",
            type: "varchar",
            length: "255",
          },
          {
            name: "water_level",
            type: "varchar",
            length: "255",
          },
          {
            name: "interval",
            type: "varchar",
            length: "255",
          },
          {
            name: "water_level_two",
            type: "varchar",
            length: "255",
          },
          {
            name: "interval_two",
            type: "varchar",
            length: "255",
          },
          {
            name: "torque",
            type: "varchar",
            length: "255",
          },
          {
            name: "coating",
            type: "varchar",
            length: "255",
          },
          {
            name: "ultimate_digger",
            type: "varchar",
            length: "255",
          },
          {
            name: "initial_helical",
            type: "varchar",
            length: "255",
          },
          {
            name: "final_helical",
            type: "varchar",
            length: "255",
          },
          {
            name: "print_spt",
            type: "varchar",
            length: "255",
          },
          {
            name: "stop",
            type: "varchar",
            length: "255",
          },
          {
            name: "text_poll",
            type: "varchar",
            length: "255",
          },
          {
            name: "prober",
            type: "varchar",
            length: "255",
          },
          {
            name: "page_lines",
            type: "varchar",
            length: "255",
          },
          {
            name: "project_id",
            type: "uuid",
          },
        ],
      })
    );

    await queryRunner.createForeignKey(
      "hole",
      new TableForeignKey({
        columnNames: ["project_id"],
        referencedTableName: "project",
        referencedColumnNames: ["id"],
        onDelete: "CASCADE",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("hole");
  }
}
