import {MigrationInterface, QueryRunner, TableForeignKey} from "typeorm";

export class AddCustomerIdForeignKeyToOrdersTable1598308980093 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.createForeignKey('orders', new TableForeignKey({
            name: 'CustomerId',
            columnNames: ['customer_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'customers',
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE',
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropForeignKey('orders', 'CustomerId');
    }

}
