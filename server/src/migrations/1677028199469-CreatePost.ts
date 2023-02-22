import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class CreatePost1677028199469 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: 'post',
				columns: [
					{
						name: 'id',
						type: 'uuid',
						isPrimary: true,
						isGenerated: true,
						generationStrategy: 'uuid',
						isNullable: false
					},
					{
						name: 'imgUrl',
						type: 'text',
						isNullable: false
					},
					{
						name: 'caption',
						type: 'text',
						isNullable: false
					},
					{
						name: 'authorId',
						type: 'uuid',
						isNullable: false
					},
					{
						name: 'createdAt',
						type: 'timestamptz',
						isNullable: false,
						default: 'now()'
					},
					{
						name: 'updatedAt',
						type: 'timestamptz',
						isNullable: false,
						default: 'now()',
						onUpdate: 'now()'
					}
				]
			})
		);

		await queryRunner.createForeignKey(
			'post',
			new TableForeignKey({
				columnNames: ['authorId'],
				referencedTableName: 'user',
				referencedColumnNames: ['id']
			})
		);

		await queryRunner.createTable(
			new Table({
				name: 'post_likes_user',
				columns: [
					{
						name: 'postId',
						type: 'uuid',
						isPrimary: true
					},
					{
						name: 'userId',
						type: 'uuid',
						isPrimary: true
					}
				]
			})
		);

		await queryRunner.createForeignKey(
			'post_likes_user',
			new TableForeignKey({
				columnNames: ['postId'],
				referencedTableName: 'post',
				referencedColumnNames: ['id']
			})
		);

		await queryRunner.createForeignKey(
			'post_likes_user',
			new TableForeignKey({
				columnNames: ['userId'],
				referencedTableName: 'user',
				referencedColumnNames: ['id']
			})
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('user');
		await queryRunner.dropTable('post_likes_user');
	}
}
