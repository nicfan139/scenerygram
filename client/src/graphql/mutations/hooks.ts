import { useMutation } from '@apollo/client';
import { getRequestHeaders } from '@/helpers';
import { POSTS_QUERY, POST_QUERY, USER_QUERY } from '../queries/typeDefs';
import {
	UPDATE_USER_MUTATION,
	UPDATE_USER_PASSWORD_MUTATION,
	ADD_POST_MUTATION,
	UPDATE_POST_MUTATION,
	LIKE_POST_MUTATION,
	UNLIKE_POST_MUTATION,
	ADD_COMMENT_MUTATION,
	LIKE_COMMENT_MUTATION,
	UNLIKE_COMMENT_MUTATION
} from './typeDefs';

export const useUpdateUserMutaton = () => {
	const [mutate, { loading }] = useMutation(UPDATE_USER_MUTATION);

	return {
		isLoading: loading,
		updateUser: async (
			userId: string,
			input: { firstName: string; lastName: string; username: string; avatarUrl: string }
		) => {
			const user = await mutate({
				context: getRequestHeaders(),
				variables: {
					userId,
					input
				}
			});
			return user;
		}
	};
};

export const useUpdateUserPasswordMutaton = () => {
	const [mutate, { loading }] = useMutation(UPDATE_USER_PASSWORD_MUTATION);

	return {
		isLoading: loading,
		updatePassword: async (input: { currentPassword: string; newPassword: string }) => {
			const user = await mutate({
				context: getRequestHeaders(),
				variables: {
					input
				}
			});
			return user;
		}
	};
};

export const useAddPostMutation = () => {
	const [mutate, { loading }] = useMutation(ADD_POST_MUTATION);

	return {
		isLoading: loading,
		addPost: async (
			userId: string,
			input: { imgUrl: string; caption: string; location?: string }
		) => {
			const post = await mutate({
				context: getRequestHeaders(),
				variables: {
					input
				},
				refetchQueries: [
					{
						query: POSTS_QUERY,
						context: getRequestHeaders()
					},
					{
						query: USER_QUERY,
						context: getRequestHeaders(),
						variables: {
							userId
						}
					}
				]
			});
			return post;
		}
	};
};

export const useUpdatePostMutation = () => {
	const [mutate, { loading }] = useMutation(UPDATE_POST_MUTATION);

	return {
		isLoading: loading,
		updatePost: async (
			postId: string,
			input: { imgUrl: string; caption: string; location?: string }
		) => {
			const post = await mutate({
				context: getRequestHeaders(),
				variables: {
					postId,
					input
				},
				refetchQueries: [
					{
						query: POSTS_QUERY,
						context: getRequestHeaders()
					},
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
