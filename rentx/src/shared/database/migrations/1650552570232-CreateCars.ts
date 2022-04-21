import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateCars1650552570232 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'cars',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'description',
            type: 'varchar',
          },
          {
            name: 'dailyRate',
            type: 'numeric',
          },
          {
            name: 'available',
            type: 'varchar',
            default: true,
          },
          {
            name: 'licensePlate',
            type: 'varchar',
          },
          {
            name: 'fineAmount',
            type: 'numeric',
          },
          {
            name: 'brand',
            type: 'varchar',
          },
          {
            name: 'categoryId',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
        foreignKeys: [
          {
            name: 'FKCategoryCar',
            referencedTableName: 'categories',
            referencedColumnNames: ['id'],
            columnNames: ['categoryId'],
            onDelete: 'SET NULL',
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('cars');
  }
}
