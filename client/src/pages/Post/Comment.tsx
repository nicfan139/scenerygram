import { toast } from 'react-toastify';
import dayjs from 'dayjs';
import { FiThumbsUp } from 'react-icons/fi';
import { twMerge } from 'tailwind-merge';
import { Avatar } from '@/components';
import { useUserContext } from '@/contexts';
import { useLikeCommentMutation, useUnlikeCommentMutation } from '@/graphql';

interface ICommentProps {
	postId: string;
	comment: TComment;
}

const Comment = ({ postId, comment }: ICommentProps): React.ReactElement => {
	const { currentUser } = useUserContext();
	const { likeComment } = useLikeCommentMutation();
	const { unlikeComment } = useUnlikeCommentMutation();

	const { id, author, createdAt, text, likes } = comment;

	const onLikeComment = async () => {
		try {
			await likeComment(id, postId);
		} catch (e: unknown) {
			const error = e as ErrorEvent;
			console.log(error);
			toast('Unable to like comment');
		}
	};

	const onUnlikeComment = async () => {
		try {
			await unlikeComment(id, postId);
		} catch (e: unknown) {
			const error = e as ErrorEvent;
			console.log(error);
			toast('Unable to unlike comment');
		}
	};

	const CURRENT_USER_LIKES_COMMENT = comment.likes.some((user) => user.id === currentUser?.id);

	return (
		<div className="mb-4 p-4 border bg-white">
			<div className="flex justify-between items-center text-slate-400">
				<div className="flex gap-2 items-center">
					<Avatar imgUrl={author.avatarUrl} size="small" />
					<label className="font-semibold italic">{author.username}</label>
				</div>

				<label className="italic">{dayjs(createdAt).format('DD/MM/YYYY h:mm a')}</label>
			</div>

			<p className="my-2">{text}</p>

			<div className="flex gap-4 justify-end items-center">
				<div className="flex gap-2 items-center text-lg">
					<FiThumbsUp />
					<label>{likes.length}</label>
				</div>

				<button
					type="button"
					title={`${CURRENT_USER_LIKES_COMMENT ? 'Unlike' : 'Like'} this comment`}
					onClick={CURRENT_USER_LIKES_COMMENT ? onUnlikeComment : onLikeComment}
					className={twMerge(
						'px-2 py-1',
						CURRENT_USER_LIKES_COMMENT &&
							'text-white bg-slate-900 border-slate-900 hover:text-slate-900 hover:bg-white'
					)}
				>
					{CURRENT_USER_LIKES_COMMENT ? 'Liked' : 'Like'}
				</button>
			</div>
		</div>
	);
};

export default Comment;
