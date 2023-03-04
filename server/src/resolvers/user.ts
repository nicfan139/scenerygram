import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import { UserRepository, throwError, PostRepository, CommentRepository } from './helpers';

dotenv.config();

export const UserResolvers = {
	Query: {
		user: async (
			_root: unknown,
			args: { userId: string },
			context: {
				id: string;
			}
		) => {
			if (!context.id) {
				throwError('Unauthorized');
			}

			const user = await UserRepository.findOne({
				where: {
					id: args.userId
				},
				relations: ['posts', 'comments', 'comments.post', 'comments.likes'],
				order: {
					posts: {
						createdAt: 'DESC'
					},
					comments: {
						createdAt: 'DESC'
					}
				}
			});
			if (user) {
				return user;
			} else {
				throwError(`User #${args.userId} does not exist`);
			}
		}
	},

	Mutation: {
		addUser: async (
			_root: unknown,
			args: {
				input: {
					firstName: string;
					lastName: string;
					username: string;
					password: string;
					avatarUrl: string;
				};
			}
		) => {
			const existingUser = await UserRepository.findOneBy({ username: args.input.username });

			if (!existingUser) {
				const BCRYPT_SALT_ROUNDS = process.env.BCRYPT_SALT_ROUNDS;
				const hashedPassword = await bcrypt.hash(args.input.password, Number(BCRYPT_SALT_ROUNDS));
				if (hashedPassword) {
					const payload = {
						...args.input,
						password: hashedPassword
					};
					const user = await UserRepository.create(payload);
					const savedUser = await UserRepository.save(user);

					return savedUser;
				} else {
					throwError('Unable to encrypt password');
				}
			} else {
				throwError(`Username "${args.input.username}" already exists`);
			}
		},

		updateUser: async (
			_root: unknown,
			args: {
				userId: string;
				input: {
					firstName: string;
					lastName: string;
					username: string;
					avatarUrl: string;
				};
			},
			context: {
				id: string;
			}
		) => {
			if (!context.id) {
				throwError('Unauthorized');
			}

			const user = await UserRepository.findOne({
				where: {
					id: args.userId
				},
				relations: {
					posts: true
				}
			});

			if (user) {
				UserRepository.merge(user, args.input);
				const updatedUser = await UserRepository.save(user);
				return updatedUser;
			} else {
				throwError(`User #${args.userId} does not exist`);
			}
		},

		updateUserPassword: async (
			_root: unknown,
			args: {
				input: {
					currentPassword: string;
					newPassword: string;
				};
			},
			context: {
				id: string;
			}
		) => {
			if (!context.id) {
				throwError('Unauthorized');
			}

			const user = await UserRepository.findOneBy({ id: context.id });

			if (user) {
				const passwordMatch = await bcrypt.compare(args.input.currentPassword, user.password);
				if (passwordMatch) {
					const BCRYPT_SALT_ROUNDS = process.env.BCRYPT_SALT_ROUNDS;
					const hashedPassword = await bcrypt.hash(
						args.input.newPassword,
						Number(BCRYPT_SALT_ROUNDS)
					);
					if (hashedPassword) {
						const payload = {
							...user,
							password: hashedPassword
						};
						const updatedUser = await UserRepository.save(payload);
						return updatedUser;
					} else {
						throwError('Unable to encrypt new password');
					}
				} else {
					throwError(`Current password entered for user #${user.id} is incorrect`);
				}
			} else {
				throwError(`Unable to fetch details for user #${context.id}`);
			}
		},

		deleteUser: async (
			_root: unknown,
			args: {
				userId: string;
			},
			context: {
				id: string;
			}
		) => {
			if (!context.id) {
				throwError('Unauthorized');
			}

			const USER_ID_TO_DELETE = args.userId;

			const user = await UserRepository.findOne({
				where: {
					id: USER_ID_TO_DELETE
				},
				relations: {
					posts: true,
					comments: true
				}
			});

			if (user) {
				// Delete user posts
				await Promise.all(
					user.posts.map(async (post) => {
						await PostRepository.delete(post.id);
					})
				);

				// Delete user comments
				await Promise.all(
					user.comments.map(async (comment) => {
						await CommentRepository.delete(comment.id);
					})
				);

				await UserRepository.delete(USER_ID_TO_DELETE);
				return `Successfully deleted user #${USER_ID_TO_DELETE}`;
			} else {
				throwError(`User #${USER_ID_TO_DELETE} does not exist`);
			}
		}
	}
};
