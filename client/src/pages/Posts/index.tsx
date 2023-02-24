import { useState } from 'react';
import { FiPlus } from 'react-icons/fi';
import { LoadingScreen, Modal, Title } from '@/components';
import { useUserContext } from '@/contexts';
import { usePostsQuery } from '@/graphql';
import PostCard from './PostCard';
import AddPostForm from './AddPostForm';

const Posts = (): React.ReactElement => {
	const { currentUser } = useUserContext();
	const { isLoading, posts } = usePostsQuery();

	const [showAddPost, toggleAddPost] = useState<boolean>(false);

	if (!currentUser || isLoading || !posts) {
		return <LoadingScreen />;
	}

	return (
		<div>
			<div className="w-full md:w-auto flex gap-6 justify-between md:justify-start items-center">
				<Title className="mb-0">
					<h2>Featured Posts</h2>
				</Title>

				<button
					type="button"
					onClick={() => toggleAddPost(true)}
					className="flex gap-1 items-center"
				>
					<FiPlus />
					Post
				</button>
			</div>

			<Modal isOpen={showAddPost} onClose={() => toggleAddPost(false)}>
				<AddPostForm onClose={() => toggleAddPost(false)} />
			</Modal>

			<div className="flex flex-wrap gap-6 md:gap-4 my-4">
				{posts.map((post) => (
					<PostCard key={`post-card-${post.id}`} post={post} />
				))}
			</div>
		</div>
	);
};

export default Posts;
