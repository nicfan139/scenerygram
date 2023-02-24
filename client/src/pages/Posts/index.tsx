import { LoadingScreen, Title } from '@/components';
import { useUserContext } from '@/contexts';
import { usePostsQuery } from '@/graphql';
import PostCard from './PostCard';

const Posts = (): React.ReactElement => {
	const { currentUser } = useUserContext();
	const { isLoading, posts } = usePostsQuery();

	if (!currentUser || isLoading || !posts) {
		return <LoadingScreen />;
	}

	return (
		<div>
			<Title>
				<h2>Featured Posts</h2>
			</Title>

			<div className="flex gap-4 my-4">
				{posts.map((post) => (
					<PostCard key={`post-card-${post.id}`} post={post} />
				))}
			</div>
		</div>
	);
};

export default Posts;
