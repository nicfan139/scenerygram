import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class CreateComment1677036099207 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: 'comment',
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
						name: 'text',
						type: 'text',
						isNullable: false
					},
					{
						name: 'authorId',
						type: 'uuid',
						isNullable: false
					},
					{
						name: 'postId',
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
			'comment',
			new TableForeignKey({
				columnNames: ['authorId'],
				referencedTableName: 'user',
				referencedColumnNames: ['id']
			})
		);

		await queryRunner.createForeignKey(
			'comment',
			new TableForeignKey({
				columnNames: ['postId'],
				referencedTableName: 'post',
				referencedColumnNames: ['id']
			})
		);

		await queryRunner.createTable(
			new Table({
				name: 'comment_likes_user',
				columns: [
					{
						name: 'commentId',
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
			'comment_likes_user',
			new TableForeignKey({
				columnNames: ['commentId'],
				referencedTableName: 'comment',
				referencedColumnNames: ['id']
			})
		);

		await queryRunner.createForeignKey(
			'comment_likes_user',
			new TableForeignKey({
				columnNames: ['userId'],
				referencedTableName: 'user',
				referencedColumnNames: ['id']
			})
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('comment');
		await queryRunner.dropTable('comment_likes_user');
	}
}
