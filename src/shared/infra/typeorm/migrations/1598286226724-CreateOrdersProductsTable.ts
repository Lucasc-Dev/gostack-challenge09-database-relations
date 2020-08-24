import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CreateOrdersProductsTable1598286226724 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.createTable(new Table({
            name: 'orders_products',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true,
                    generationStrategy: 'uuid',
                    default: 'uuid_generate_v4()',
                },
                {
                    name: 'order_id',
                    type: 'uuid',
                },
                {
                    name: 'product_id',
                    type: 'uuid',
                },
                {
                    name: 'quantity',
                    type: 'integer',
                },
                {
                    name: 'price',
                    type: 'decimal',
                },
                {
                    name: 'created_at',
                    type: 'timestamp',
                    default: 'now()',
                },
                {
                    name: 'updated_at',
                    type: 'timestamp',
                    default: 'now()',
                }, 
            ]
        }));
        await queryRunner.createForeignKey('orders_products', new TableForeignKey({
            name: 'OrderId',
            referencedTableName: 'orders',
            referencedColumnNames: ['id'],
            columnNames: ['order_id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        }));
        await queryRunner.createForeignKey('orders_products', new TableForeignKey({
            name: 'ProductId',
            referencedTableName: 'products',
            referencedColumnNames: ['id'],
            columnNames: ['product_id'],
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE',
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropForeignKey('orders_products', 'ProductId');
        await queryRunner.dropForeignKey('orders_products', 'OrderId');
        await queryRunner.dropTable('orders_products');
    }

}
