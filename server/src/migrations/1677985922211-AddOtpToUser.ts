import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddOtpToUser1677985922211 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.addColumns('user', [
			new TableColumn({
				name: 'email',
				type: 'text',
				isNullable: true
			}),
			new TableColumn({
				name: 'otpEnabled',
				type: 'boolean',
				isNullable: false,
				default: false
			}),
			new TableColumn({
				name: 'otpSecret',
				type: 'text',
				isNullable: true
			})
		]);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropColumns('user', ['email', 'otpEnabled', 'otpSecret']);
	}
}
