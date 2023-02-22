import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn,
	UpdateDateColumn,
	ManyToOne,
	ManyToMany,
	JoinTable
} from 'typeorm';
import { User } from './User';

@Entity()
export class Post {
	@PrimaryGeneratedColumn('uuid')
	id!: string;

	@Column({
		type: 'text',
		nullable: false
	})
	caption!: string;

	@Column({
		type: 'text',
		nullable: true
	})
	imgUrl!: string;

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

	@ManyToOne(() => User, (user) => user.posts)
	author!: User;

	@ManyToMany(() => User, (user) => user.likedPosts)
	@JoinTable()
	likes!: User[];
}
