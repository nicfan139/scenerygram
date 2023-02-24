import { useParams, Link } from 'react-router-dom';
import dayjs from 'dayjs';
import { FiChevronLeft, FiThumbsUp, FiCopy, FiMessageCircle } from 'react-icons/fi';
import { twMerge } from 'tailwind-merge';
import { toast } from 'react-toastify';
import { Loading, Title } from '@/components';
import { useUserContext } from '@/contexts';
import { usePostQuery, useLikePostMutation, useUnlikePostMutation } from '@/graphql';
import AddCommentInput from './AddCommentInput';
import Comment from './Comment';

const Post = (): React.ReactElement => {
	const { postId } = useParams();
	const { currentUser } = useUserContext();
	const { isLoading: isLoadingPost, post } = usePostQuery(postId as string);
	const { likePost } = useLikePostMutation();
	const { unlikePost } = useUnlikePostMutation();

	const onLikePost = async () => {
		try {
			await likePost(postId as string);
		} catch (e: unknown) {
			const error = e as ErrorEvent;
			console.log(error);
			toast('Unable to like post');
		}
	};

	const onUnLikePost = async () => {
		try {
			await unlikePost(postId as string);
		} catch (e: unknown) {
			const error = e as ErrorEvent;
			console.log(error);
			toast('Unable to unlike post');
		}
	};

	const onShareClick = () => {
		const { navigator, location } = window;
		navigator.clipboard.writeText(location.href);
		toast('Copied share link!');
	};

	const CURRENT_USER_LIKES_POST = post?.likes.some((user) => user.id === currentUser?.id);

	return (
		<div>
			<div className="mb-4">
				<Link to="/posts" className="flex gap-1 items-center">
					<FiChevronLeft />
					Back to posts
				</Link>
			</div>

			{isLoadingPost || !post ? (
				<div className="w-full flex justify-center">
					<Loading />
				</div>
			) : (
				<div className="flex gap-6 flex-col md:flex-row">
					<div className="w-3/5">
						<Title>
							<h2>{post.caption}</h2>
						</Title>

						<img src={post.imgUrl} alt={post.id} className="h-auto w-full object-contain mb-4" />

						<div className="flex justify-between items-center mb-4">
							<div className="flex flex-col">
								<p className="font-semibold">Posted by {post.author.username}</p>
								<p className="italic">on {dayjs(post.createdAt).format('DD/MM/YYYY h:mm a')}</p>
							</div>

							<div className="flex gap-2">
								<button
									type="button"
									title={`${CURRENT_USER_LIKES_POST ? 'Unlike' : 'Like'} this post`}
									onClick={CURRENT_USER_LIKES_POST ? onUnLikePost : onLikePost}
									className={twMerge(
										'flex gap-2 items-center',
										CURRENT_USER_LIKES_POST &&
											'text-white bg-slate-900 border-slate-900 hover:bg-white hover:border-slate-900'
									)}
								>
									<FiThumbsUp />
									<label>
										{post.likes.length} {post.likes.length === 1 ? 'Like' : 'Likes'}
									</label>
								</button>

								<button
									type="button"
									title="Copy share link"
									onClick={onShareClick}
									className="flex gap-2 items-center"
								>
									<FiCopy />
									Share
								</button>
							</div>
						</div>

						{/* TODO: Add similar posts */}
					</div>

					<div className="w-2/5 overflow-y-auto">
						<h3 className="flex gap-2 items-center mb-2 text-xl">
							<FiMessageCircle />
							Comments ({post.comments.length})
						</h3>

						<AddCommentInput postId={postId as string} />

						<div>
							{post.comments.map((comment) => (
								<Comment key={`post-comment-${comment.id}`} postId={post.id} comment={comment} />
							))}
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default Post;
