import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class RecreatePriceFielInProductsTable1598342278975 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropColumn('products', 'price');

        await queryRunner.addColumn('products', new TableColumn({
            name: 'price',
            type: 'decimal',
            precision: 10,
            scale: 2,
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropColumn('products', 'price');

        await queryRunner.addColumn('products', new TableColumn({
            name: 'price',
            type: 'decimal',
        }));
    }

}
