import { useMutation } from '@apollo/client';
import { getRequestHeaders } from '@/helpers';
import { POST_QUERY } from '../queries/typeDefs';
import { ADD_COMMENT_MUTATION } from './typeDefs';

export const useAddCommentMutation = () => {
	const [mutate, { loading }] = useMutation(ADD_COMMENT_MUTATION);

	return {
		isLoading: loading,
		addComment: async (postId: string, text: string) => {
			const comment = await mutate({
				context: getRequestHeaders(),
				variables: {
					postId,
					text
				},
				refetchQueries: [
					{
						query: POST_QUERY,
						context: getRequestHeaders(),
						variables: {
							postId
						}
					}
				]
			});
			return comment;
		}
	};
};
