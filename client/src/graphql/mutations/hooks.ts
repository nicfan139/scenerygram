import { useMutation } from '@apollo/client';
import { getRequestHeaders } from '@/helpers';
import { POST_QUERY } from '../queries/typeDefs';
import {
	LIKE_POST_MUTATION,
	UNLIKE_POST_MUTATION,
	ADD_COMMENT_MUTATION,
	LIKE_COMMENT_MUTATION,
	UNLIKE_COMMENT_MUTATION
} from './typeDefs';

export const useLikePostMutation = () => {
	const [mutate] = useMutation(LIKE_POST_MUTATION);

	return {
		likePost: async (postId: string) => {
			const post = await mutate({
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
			return post;
		}
	};
};

export const useUnlikePostMutation = () => {
	const [mutate] = useMutation(UNLIKE_POST_MUTATION);

	return {
		unlikePost: async (postId: string) => {
			const post = await mutate({
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
			return post;
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

export const useLikeCommentMutation = () => {
	const [mutate] = useMutation(LIKE_COMMENT_MUTATION);

	return {
		likeComment: async (commentId: string, postId: string) => {
			const comment = await mutate({
				context: getRequestHeaders(),
				variables: {
					commentId
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

export const useUnlikeCommentMutation = () => {
	const [mutate] = useMutation(UNLIKE_COMMENT_MUTATION);

	return {
		unlikeComment: async (commentId: string, postId: string) => {
			const comment = await mutate({
				context: getRequestHeaders(),
				variables: {
					commentId
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
