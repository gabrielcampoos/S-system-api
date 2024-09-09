import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class ChangeHatchColumnToText1616439497432
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      "layer",
      "hatch",
      new TableColumn({
        name: "hatch",
        type: "text",
        isNullable: true,
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      "layer",
      "hatch",
      new TableColumn({
        name: "hatch",
        type: "varchar",
        length: "255",
        isNullable: true,
      })
    );
  }
}
