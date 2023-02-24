import { useQuery } from '@apollo/client';
import { getRequestHeaders } from '@/helpers';
import { POSTS_QUERY, POST_QUERY } from './typeDefs';

export const usePostsQuery = () => {
	const { loading, data } = useQuery<{ posts: TPost[] }>(POSTS_QUERY, {
		context: getRequestHeaders()
	});

	return {
		isLoading: loading,
		posts: data?.posts
	};
};

export const usePostQuery = (postId: string) => {
	const { loading, data } = useQuery<{ post: TPost }>(POST_QUERY, {
		context: getRequestHeaders(),
		variables: {
			postId
		}
	});

	return {
		isLoading: loading,
		post: data?.post
	};
};
