import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateRolePermissionsTable1756287145945 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "role_permissions",
        columns: [
          { name: "role_id", type: "uuid" },
          { name: "permission_id", type: "uuid" },
        ],
        foreignKeys: [
          {
            columnNames: ["role_id"],
            referencedTableName: "roles",
            referencedColumnNames: ["id"],
            onDelete: "CASCADE",
          },
          {
            columnNames: ["permission_id"],
            referencedTableName: "permissions",
            referencedColumnNames: ["id"],
            onDelete: "CASCADE",
          },
        ],
      })
    );
  }

    public async down(queryRunner: QueryRunner): Promise<void> {
            await queryRunner.dropTable("role_permissions");
    }

}
