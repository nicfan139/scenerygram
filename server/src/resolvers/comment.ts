import { CommentRepository, PostRepository, UserRepository, throwError } from './helpers';

export const CommentResolvers = {
	Mutation: {
		addComment: async (
			_root: unknown,
			args: {
				postId: string;
				text: string;
			},
			context: {
				id: string;
			}
		) => {
			if (!context.id) {
				throwError('Unauthorized');
			}

			const author = await UserRepository.findOneBy({ id: context.id });
			const post = await PostRepository.findOneBy({ id: args.postId });

			if (author && post) {
				const comment = await CommentRepository.create({
					text: args.text,
					author,
					post
				});
				const result = await CommentRepository.save(comment);
				return result;
			} else {
				throwError(`Unable to create new comment for post #${args.postId}`);
			}
		},

		likeComment: async (
			_root: unknown,
			args: {
				commentId: string;
			},
			context: {
				id: string;
			}
		) => {
			if (!context.id) {
				throwError('Unauthorized');
			}

			const user = await UserRepository.findOneBy({
				id: context.id
			});

			const comment = await CommentRepository.findOne({
				where: {
					id: args.commentId
				},
				relations: {
					author: true,
					likes: true
				}
			});

			if (user && comment) {
				const updatedComment = CommentRepository.merge(comment, {
					likes: [...comment.likes, user]
				});
				const result = await CommentRepository.save(updatedComment);
				return result;
			} else {
				throwError(`Unable to like comment`);
			}
		},

		unlikeComment: async (
			_root: unknown,
			args: {
				commentId: string;
			},
			context: {
				id: string;
			}
		) => {
			if (!context.id) {
				throwError('Unauthorized');
			}

			const comment = await CommentRepository.findOne({
				where: {
					id: args.commentId
				},
				relations: {
					author: true,
					likes: true
				}
			});

			if (comment) {
				comment.likes = comment.likes.filter((user) => user.id !== context.id);
				const result = await CommentRepository.save(comment);
				return result;
			} else {
				throwError('Unable to unlike comment');
			}
		}
	}
};
