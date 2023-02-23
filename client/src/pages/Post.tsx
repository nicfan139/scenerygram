import { ChangeEvent, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FiThumbsUp, FiMessageCircle } from 'react-icons/fi';
import { usePostQuery } from '@/graphql';
import { Loading, Title } from '@/components';
import { formatDate } from '@/helpers';

const Post = (): React.ReactElement => {
	const { postId } = useParams();
	const { isLoading, post } = usePostQuery(postId as string);

	const [comment, setComment] = useState<string>('');

	const onLikePost = async () => {
		try {
			// TODO: Add like post mutation
		} catch (e: unknown) {
			const error = e as ErrorEvent;
			console.log(error);
		}
	};

	const onAddComment = async () => {
		try {
			// TODO: Add commment mutation
		} catch (e: unknown) {
			const error = e as ErrorEvent;
			console.log(error);
		}
	};

	return (
		<div>
			<div className="mb-4">
				<Link to="/posts">Back to posts</Link>
			</div>

			{isLoading || !post ? (
				<div className="w-full flex justify-center">
					<Loading />
				</div>
			) : (
				<div className="flex gap-6 flex-col md:flex-row">
					<div className="w-full max-w-lg">
						<Title>
							<h2>{post.caption}</h2>
						</Title>

						<img src={post.imgUrl} alt={post.id} className="h-auto w-full object-contain" />

						<div className="flex justify-between">
							<p>Posted on {formatDate(post.createdAt)}</p>

							<button
								type="button"
								title="Like this post"
								onClick={onLikePost}
								className="flex gap-2 items-center"
							>
								<FiThumbsUp />
								<label>{post.likes.length} likes</label>
							</button>
						</div>
					</div>

					<div className="w-full overflow-y-auto">
						<h3 className="flex gap-2 items-center mb-2 text-xl">
							<FiMessageCircle />
							Comments ({post.comments.length})
						</h3>

						<div className="flex gap-2 p-4 bg-white">
							<input
								placeholder="Add a comment"
								className="w-full m-0"
								onChange={(e: ChangeEvent<HTMLInputElement>) => setComment(e.target.value)}
								value={comment}
							/>
							<button type="button" onClick={onAddComment}>
								Send
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default Post;
