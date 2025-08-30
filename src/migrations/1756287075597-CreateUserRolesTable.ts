import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUserRolesTable1756287075597 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "user_roles",
        columns: [
          { name: "user_id", type: "uuid" },
          { name: "role_id", type: "uuid" },
        ],
        foreignKeys: [
          {
            columnNames: ["user_id"],
            referencedTableName: "users",
            referencedColumnNames: ["id"],
            onDelete: "CASCADE",
          },
          {
            columnNames: ["role_id"],
            referencedTableName: "roles",
            referencedColumnNames: ["id"],
            onDelete: "CASCADE",
          },
        ],
      })
    );
  }

    public async down(queryRunner: QueryRunner): Promise<void> {
            await queryRunner.dropTable("user_roles");
    }

}
