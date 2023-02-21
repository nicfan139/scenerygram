import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn,
	UpdateDateColumn
} from 'typeorm';

@Entity()
export class User {
	@PrimaryGeneratedColumn('uuid')
	id!: string;

	@Column({
		type: 'text',
		nullable: false
	})
	firstName!: string;

	@Column({
		type: 'text',
		nullable: false
	})
	lastName!: string;

	@Column({
		type: 'text',
		nullable: false
	})
	username!: string;

	@Column({
		type: 'text',
		nullable: false
	})
	password!: string;

	@Column({
		type: 'text',
		nullable: true
	})
	avatarUrl!: string;

	@CreateDateColumn({
		type: 'timestamptz',
		default: () => 'now()'
	})
	createdAt!: Date;

	@UpdateDateColumn({
		type: 'timestamptz',
		default: () => 'now()'
	})
	updatedAt!: Date;
}
