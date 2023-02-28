import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn,
	UpdateDateColumn,
	ManyToOne,
	OneToMany,
	ManyToMany,
	JoinTable
} from 'typeorm';
import { Comment } from './Comment';
import { User } from './User';

@Entity()
export class Post {
	@PrimaryGeneratedColumn('uuid')
	id!: string;

	@Column({
		type: 'text',
		nullable: false
	})
	imgUrl!: string;

	@Column({
		type: 'text',
		nullable: false
	})
	caption!: string;

	@Column({
		type: 'text',
		nullable: true
	})
	location!: string;

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

	@OneToMany(() => Comment, (comment) => comment.post)
	comments!: Comment[];

	@ManyToMany(() => User, (user) => user.likedPosts)
	@JoinTable()
	likes!: User[];
}
