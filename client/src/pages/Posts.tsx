import dayjs from 'dayjs';
import { Title } from '@/components';
import { useUserContext } from '@/contexts';

const Posts = (): React.ReactElement => {
	const { currentUser } = useUserContext();

	return (
		<div>
			<Title>
				<h2>Featured Posts</h2>
			</Title>

			<div className="flex gap-4 my-4">
				{(currentUser as TUser).posts.map((post) => (
					<div key={`post-card-${post.id}`} className="flex flex-col bg-white">
						<img src={post.imgUrl} alt={post.id} className="h-48 w-80 object-cover" />
						<div className="p-4">
							<label>{post.caption}</label>
							<div className="flex justify-end items-center">
								<p>{dayjs(post.createdAt).format('DD/MM/YYYY h:MM a')}</p>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default Posts;
