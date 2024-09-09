import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export class CreateTableLayer1725037870768 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "layer",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
            generationStrategy: "uuid",
            default: "uuid_generate_v4()",
          },
          {
            name: "project_number",
            type: "int",
          },
          {
            name: "code",
            type: "int",
          },
          {
            name: "type",
            type: "varchar",
            length: "255",
          },
          {
            name: "description",
            type: "varchar",
            length: "255",
          },
          {
            name: "hatch",
            type: "varchar",
            length: "255",
          },

          {
            name: "depth",
            type: "float",
          },
          {
            name: "hole_id",
            type: "uuid",
          },
        ],
      })
    );

    await queryRunner.createForeignKey(
      "layer",
      new TableForeignKey({
        columnNames: ["hole_id"],
        referencedTableName: "hole",
        referencedColumnNames: ["id"],
        onDelete: "CASCADE",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable("layer");
    const foreignKey = table!.foreignKeys.find(
      (fk) => fk.columnNames.indexOf("hole_id") !== -1
    );
    await queryRunner.dropForeignKey("layer", foreignKey!);
    await queryRunner.dropTable("layer");
  }
}
