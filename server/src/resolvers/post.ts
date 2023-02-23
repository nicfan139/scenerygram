import { PostRepository, throwError, UserRepository, CommentRepository } from './helpers';

export const PostResolvers = {
	Query: {
		posts: async (
			_root: unknown,
			_args: unknown,
			context: {
				id: string;
			}
		) => {
			if (!context.id) {
				throwError('Unauthorized');
			}

			const posts = await PostRepository.find({
				relations: {
					author: true,
					likes: true,
					comments: true
				},
				order: {
					createdAt: 'DESC'
				}
			});

			return posts;
		},

		post: async (
			_root: unknown,
			args: {
				postId: string;
			},
			context: {
				id: string;
			}
		) => {
			if (!context.id) {
				throwError('Unauthorized');
			}

			const post = await PostRepository.findOne({
				where: {
					id: args.postId
				},
				relations: ['author', 'likes', 'comments.author'],
				order: {
					createdAt: 'DESC'
				}
			});

			if (post) {
				return post;
			} else {
				throwError(`Post #${args.postId} does not exist`);
			}
		}
	},

	Mutation: {
		addPost: async (
			_root: unknown,
			args: {
				input: {
					imgUrl: string;
					caption: string;
				};
			},
			context: {
				id: string;
			}
		) => {
			if (!context.id) {
				throwError('Unauthorized');
			}

			const author = await UserRepository.findOneBy({ id: context.id });

			if (author) {
				const payload = {
					...args.input,
					author
				};

				const post = await PostRepository.create(payload);
				const result = await PostRepository.save(post);
				return result;
			} else {
				throwError(`Unable to find user #${context.id}`);
			}
		},

		updatePost: async (
			_root: unknown,
			args: {
				postId: string;
				input: {
					imgUrl: string;
					caption: string;
				};
			},
			context: {
				id: string;
			}
		) => {
			if (!context.id) {
				throwError('Unauthorized');
			}

			const post = await PostRepository.findOneBy({ id: args.postId });

			if (post) {
				const updatedPost = PostRepository.merge(post, args.input);
				const result = await PostRepository.save(updatedPost);
				return result;
			} else {
				throwError(`Post #${args.postId} does not exist`);
			}
		},

		deletePost: async (
			_root: unknown,
			args: {
				postId: string;
			},
			context: {
				id: string;
			}
		) => {
			if (!context.id) {
				throwError('Unauthorized');
			}

			const POST_ID_TO_DELETE = args.postId;

			const post = await PostRepository.findOne({
				where: {
					id: args.postId
				},
				relations: {
					comments: true,
					likes: true
				}
			});

			if (post) {
				// Delete all post comments
				await Promise.all(
					post.comments.map(async (comment) => {
						await CommentRepository.delete(comment.id);
					})
				);

				// Remove post from each user's liked posts
				await Promise.all(
					post.likes.map(async (user) => {
						user.likedPosts = user.likedPosts.filter((post) => post.id !== POST_ID_TO_DELETE);
						await UserRepository.save(user);
					})
				);

				await PostRepository.delete(POST_ID_TO_DELETE);
				return `Successfully deleted post #${POST_ID_TO_DELETE}`;
			} else {
				throwError(`Post #${POST_ID_TO_DELETE} does not exist`);
			}
		}
	}
};
