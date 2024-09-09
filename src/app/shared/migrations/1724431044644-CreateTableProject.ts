import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export class CreateTableProject1715017919347 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "project",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
            generationStrategy: "uuid",
            default: "uuid_generate_v4()", // Ajuste conforme o banco de dados
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
            length: "255",
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
          {
            name: "user_id",
            type: "uuid",
          },
        ],
      })
    );

    await queryRunner.createForeignKey(
      "project",
      new TableForeignKey({
        columnNames: ["user_id"],
        referencedTableName: "user",
        referencedColumnNames: ["id"],
        onDelete: "CASCADE",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("project");
  }
}
