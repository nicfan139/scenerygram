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
		}
	}
};
