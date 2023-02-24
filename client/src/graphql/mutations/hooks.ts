import { useMutation } from '@apollo/client';
import { getRequestHeaders } from '@/helpers';
import { POST_QUERY } from '../queries/typeDefs';
import { LIKE_POST_MUTATION, UNLIKE_POST_MUTATION, ADD_COMMENT_MUTATION } from './typeDefs';

export const useLikePostMutation = () => {
	const [mutate, { loading }] = useMutation(LIKE_POST_MUTATION);

	return {
		isLoading: loading,
		likePost: async (postId: string) => {
			const comment = await mutate({
				context: getRequestHeaders(),
				variables: {
					postId
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

export const useUnlikePostMutation = () => {
	const [mutate, { loading }] = useMutation(UNLIKE_POST_MUTATION);

	return {
		isLoading: loading,
		unlikePost: async (postId: string) => {
			const comment = await mutate({
				context: getRequestHeaders(),
				variables: {
					postId
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
