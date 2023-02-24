import { useNavigate } from 'react-router-dom';
import { FiThumbsUp, FiMessageCircle } from 'react-icons/fi';
import dayjs from 'dayjs';

interface IPostCardProps {
	post: TPost;
}

const PostCard = ({ post }: IPostCardProps): React.ReactElement => {
	const navigate = useNavigate();

	const { id, imgUrl, caption, likes, comments, createdAt } = post;

	// TODO: Add like/unlike post mutations here?

	return (
		<div
			key={`post-card-${id}`}
			className="flex flex-col bg-white hover:-translate-y-2 hover:cursor-pointer transition-all"
			onClick={() => navigate(`/posts/${id}`)}
		>
			<img src={imgUrl} alt={id} className="h-48 w-80 object-cover" />
			<div className="py-2 px-4">
				<div className="flex justify-end items-center">
					<p className="text-slate-400 italic">{dayjs(createdAt).format('DD/MM/YYYY h:mm a')}</p>
				</div>
				<div className="mb-3 text-lg">{caption}</div>
				<div className="flex gap-4 items-center mb-2">
					<div
						title="Like this post"
						className="flex items-center text-2xl"
						// TODO: Add likedpost mutation
						onClick={() => {}}
					>
						<FiThumbsUp />
						<label className="ml-1 text-xl">{likes.length}</label>
					</div>
					<div title="Leave a comment" className="flex items-center text-2xl">
						<FiMessageCircle />
						<label className="ml-1 text-xl">{comments.length}</label>
					</div>
				</div>
			</div>
		</div>
	);
};

export default PostCard;
