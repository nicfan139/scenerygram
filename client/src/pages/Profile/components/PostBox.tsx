import { Link } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';
import { FiMapPin, FiCalendar } from 'react-icons/fi';
import dayjs from 'dayjs';

interface IPostBoxProps {
	post: TPost;
	className?: string;
}

const PostBox = ({
	post: { id, caption, location, createdAt, imgUrl },
	className
}: IPostBoxProps): React.ReactElement => (
	<Link
		to={`/posts/${id}`}
		className={twMerge('flex justify-between items-center my-2 px-4 py-2 border', className)}
	>
		<div className="flex flex-col">
			<label className="mb-1">{caption}</label>

			{location && (
				<p className="flex gap-2 items-center text-slate-500">
					<FiMapPin />
					{location}
				</p>
			)}

			<p className="flex gap-2 items-center text-slate-500">
				<FiCalendar />
				{dayjs(createdAt).format('DD/MM/YYYY')}
			</p>
		</div>

		<img src={imgUrl} alt={imgUrl} className="h-24 w-40 object-cover" />
	</Link>
);

export default PostBox;
