import { PostRepository, throwError, pubSub, UserRepository } from './helpers';

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
					likes: true
				},
				order: {
					createdAt: 'DESC'
				}
			});

			return posts;
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

				pubSub.publish('POST_ADDED', {
					postAdded: result
				});

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

				pubSub.publish('POST_UPDATED', {
					postUpdated: result
				});

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
			// TODO: Delete all comments + likes

			await PostRepository.delete(args.postId);

			pubSub.publish('POST_DELETED', {
				postDeleted: args.postId
			});

			return `Successfully deleted post #${args.postId}`;
		}
	},

	Subscription: {
		postAdded: {
			subscribe: (
				_root: unknown,
				_args: unknown,
				context: {
					id: string;
				}
			) => {
				if (!context.id) {
					throwError('Unauthorized');
				}
				return pubSub.asyncIterator('POST_ADDED');
			}
		}
	}
};
