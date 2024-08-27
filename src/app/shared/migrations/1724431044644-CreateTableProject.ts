import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTableProject1724431044644 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "project",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "project_number",
            type: "varchar",
            length: "50",
          },
          {
            name: "client",
            type: "varchar",
            length: "50",
          },
          {
            name: "project_alphanumeric_number",
            type: "varchar",
            length: "50",
          },
          {
            name: "work_description",
            type: "varchar",
            length: "255",
          },
          {
            name: "work_site",
            type: "varchar",
            length: "100",
          },
          {
            name: "release_date",
            type: "date",
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
            name: "header_text",
            type: "varchar",
            length: "255",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("project", true, true, true);
  }
}
