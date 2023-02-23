import dayjs from 'dayjs';
import { FiThumbsUp } from 'react-icons/fi';

interface ICommentProps {
	comment: TComment;
}

const Comment = ({ comment }: ICommentProps): React.ReactElement => {
	const { id, author, createdAt, text, likes } = comment;

	// const onLikeComment = async () => {
	// 	try {
	// 		// TODO: Add like comment mutation
	// 	} catch (e: unknown) {
	// 		const error = e as ErrorEvent;
	// 		console.log(error);
	// 	}
	// };

	return (
		<div key={`post-comment-${id}`} className="mb-4 p-4 border bg-white">
			<div className="flex justify-between items-center text-slate-400">
				<label className="font-semibold italic">{author.username}</label>
				<label className="italic">{dayjs(createdAt).format('DD/MM/YYYY h:mm a')}</label>
			</div>
			<p className="my-2">{text}</p>
			<div className="flex gap-4 justify-end items-center">
				<div className="flex gap-2 items-center text-lg">
					<FiThumbsUp />
					<label>{likes.length}</label>
				</div>
				<button type="button" title="Like this comment">
					Like
				</button>
			</div>
		</div>
	);
};

export default Comment;
