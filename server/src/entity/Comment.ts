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
import { Post } from './Post';
import { User } from './User';

@Entity()
export class Comment {
	@PrimaryGeneratedColumn('uuid')
	id!: string;

	@Column({
		type: 'text',
		nullable: false
	})
	text!: string;

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

	@ManyToOne(() => User, (user) => user.comments)
	author!: User;

	@ManyToOne(() => Post, (post) => post.comments)
	post!: Post;

	@ManyToMany(() => User, (user) => user.likedComments)
	@JoinTable()
	likes!: User[];
}
