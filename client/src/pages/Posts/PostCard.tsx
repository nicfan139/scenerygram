import { useNavigate } from 'react-router-dom';
import { FiMapPin, FiThumbsUp, FiMessageCircle } from 'react-icons/fi';
import dayjs from 'dayjs';

interface IPostCardProps {
	post: TPost;
}

const PostCard = ({ post }: IPostCardProps): React.ReactElement => {
	const navigate = useNavigate();

	const { id, imgUrl, location, caption, likes, comments, createdAt } = post;

	return (
		<div
			className="w-full sm:w-5/12 md:w-auto flex flex-col bg-white hover:-translate-y-2 hover:cursor-pointer transition-all"
			onClick={() => navigate(`/posts/${id}`)}
		>
			<img src={imgUrl} alt={imgUrl} className="h-60 md:h-36 w-full object-cover" />

			<div className="mb-2 py-2 px-4">
				<div className="flex flex-col text-slate-500 text-base md:text-sm">
					{location && (
						<p className="flex gap-2 items-center">
							<FiMapPin />
							{location}
						</p>
					)}
					<p className="italic">{dayjs(createdAt).format('DD/MM/YYYY h:mm a')}</p>
				</div>

				<p className="mb-3 text-xl md:text-lg">{caption}</p>

				<div className="flex gap-4 items-center mb-2">
					<div className="flex items-center text-2xl">
						<FiThumbsUp />
						<label className="ml-1 text-xl">{likes.length}</label>
					</div>

					<div className="flex items-center text-2xl">
						<FiMessageCircle />
						<label className="ml-1 text-xl">{comments.length}</label>
					</div>
				</div>
			</div>
		</div>
	);
};

export default PostCard;
