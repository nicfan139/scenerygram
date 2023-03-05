import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn,
	UpdateDateColumn,
	OneToMany,
	ManyToMany
} from 'typeorm';
import { Comment } from './Comment';
import { Post } from './Post';

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
		type: 'text'
	})
	email!: string;

	@Column({
		type: 'text',
		nullable: false
	})
	password!: string;

	@Column({
		type: 'boolean',
		nullable: false,
		default: false
	})
	otpEnabled!: boolean;

	@Column({
		type: 'text',
		nullable: true
	})
	otpSecret!: string | null;

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

	@OneToMany(() => Post, (post) => post.author)
	posts!: Post[];

	@ManyToMany(() => Post, (post) => post.likes)
	likedPosts!: Post[];

	@OneToMany(() => Comment, (comment) => comment.author)
	comments!: Comment[];

	@ManyToMany(() => Comment, (comment) => comment.likes)
	likedComments!: Comment[];
}
