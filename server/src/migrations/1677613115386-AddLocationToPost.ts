import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddLocationToPost1677613115386 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.addColumn(
			'post',
			new TableColumn({
				name: 'location',
				type: 'text',
				isNullable: true
			})
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropColumn('post', 'location');
	}
}
