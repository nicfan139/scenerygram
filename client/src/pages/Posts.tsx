import dayjs from 'dayjs';
import { FiThumbsUp, FiMessageCircle } from 'react-icons/fi';
import { LoadingPage, Title } from '@/components';
import { useUserContext } from '@/contexts';

const Posts = (): React.ReactElement => {
	// TODO: make posts query
	const { currentUser } = useUserContext();

	if (!currentUser) {
		return <LoadingPage />;
	}

	return (
		<div>
			<Title>
				<h2>Featured Posts</h2>
			</Title>

			<div className="flex gap-4 my-4">
				{(currentUser as TUser).posts.map((post) => (
					<div
						key={`post-card-${post.id}`}
						className="flex flex-col bg-white hover:-translate-y-2 hover:cursor-pointer transition-all"
					>
						<img src={post.imgUrl} alt={post.id} className="h-48 w-80 object-cover" />
						<div className="py-2 px-4">
							<div className="flex justify-end items-center">
								<p className="text-slate-400 italic">
									{dayjs(post.createdAt).format('DD/MM/YYYY h:MM a')}
								</p>
							</div>
							<div className="mb-3 text-lg">{post.caption}</div>
							<div className="flex gap-4 items-center mb-2">
								<div
									title="Like this post"
									className="flex items-center text-2xl"
									// TODO: Add likedpost mutation
									onClick={() => {}}
								>
									<FiThumbsUp />
									<label className="ml-1 text-xl">{post.likes.length}</label>
								</div>
								<div
									title="Leave a comment"
									className="flex items-center text-2xl"
									// TODO: Add link to post page
									onClick={() => {}}
								>
									<FiMessageCircle />
									<label className="ml-1 text-xl">{post.comments.length}</label>
								</div>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default Posts;
