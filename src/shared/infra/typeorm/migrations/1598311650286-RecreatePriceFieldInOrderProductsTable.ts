import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class RecreatePriceFieldInOrderProductsTable1598311650286 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropColumn('orders_products', 'price');

        await queryRunner.addColumn('orders_products', new TableColumn({
            name: 'price',
            type: 'decimal',
            precision: 6,
            scale: 2,
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropColumn('orders_products', 'price');

        await queryRunner.addColumn('orders_products', new TableColumn({
            name: 'price',
            type: 'decimal',
        }));
    }

}
