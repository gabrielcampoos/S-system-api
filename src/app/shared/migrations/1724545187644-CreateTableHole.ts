import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTableHole1724431044645 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "hole",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
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
            length: "100",
          },
          {
            name: "work_description",
            type: "varchar",
            length: "255",
          },
          {
            name: "quota",
            type: "varchar",
            length: "50",
          },
          {
            name: "water_level",
            type: "varchar",
            length: "50",
          },
          {
            name: "interval",
            type: "varchar",
            length: "50",
          },
          {
            name: "water_level_two",
            type: "varchar",
            length: "50",
          },
          {
            name: "interval_two",
            type: "varchar",
            length: "50",
          },
          {
            name: "torque",
            type: "varchar",
            length: "50",
          },
          {
            name: "coating",
            type: "varchar",
            length: "50",
          },
          {
            name: "ultimate_digger",
            type: "varchar",
            length: "50",
          },
          {
            name: "initial_helical",
            type: "varchar",
            length: "50",
          },
          {
            name: "final_helical",
            type: "varchar",
            length: "50",
          },
          {
            name: "print_spt",
            type: "varchar",
            length: "50",
          },
          {
            name: "stop",
            type: "varchar",
            length: "50",
          },
          {
            name: "text_poll",
            type: "varchar",
            length: "255",
          },
          {
            name: "prober",
            type: "varchar",
            length: "50",
          },
          {
            name: "page_lines",
            type: "varchar",
            length: "50",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("hole", true, true, true);
  }
}
