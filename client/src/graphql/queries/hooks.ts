import { useQuery } from '@apollo/client';
import { getRequestHeaders } from '@/helpers';
import { POSTS_QUERY, POST_QUERY, USER_QUERY } from './typeDefs';

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

export const useCurrentUserProfileQuery = (userId?: string) => {
	const { refetch } = useQuery<{ user: TUser }>(USER_QUERY, {
		context: getRequestHeaders(),
		variables: {
			userId
		},
		skip: true
	});

	return {
		refetch: async (userId: string) => {
			const { data } = await refetch({ userId });
			return data.user;
		}
	};
};

export const useUserQuery = (userId: string) => {
	const { loading, data } = useQuery<{ user: TUser }>(USER_QUERY, {
		context: getRequestHeaders(),
		variables: {
			userId
		}
	});

	return {
		isLoading: loading,
		user: data?.user
	};
};
