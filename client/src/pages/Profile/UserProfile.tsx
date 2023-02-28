import { useParams, Link } from 'react-router-dom';
import { FiImage, FiMessageCircle, FiThumbsUp, FiCalendar } from 'react-icons/fi';
import dayjs from 'dayjs';
import { Loading, BackLink, Title, Heading, Avatar } from '@/components';
import { useUserQuery } from '@/graphql';
import { PostBox } from './components';

const UserProfile = (): React.ReactElement => {
	const { userId } = useParams();
	const { isLoading, user } = useUserQuery(userId as string);

	if (isLoading || !user) {
		return <Loading message="Fetching user details" />;
	}

	const { avatarUrl, firstName, lastName, createdAt, posts, comments } = user;

	return (
		<div>
			<BackLink to={-1} label="Go back" />

			<Title className="flex gap-4 items-center">
				<Avatar size="large" imgUrl={avatarUrl} />

				<div>
					<h2>{user.username}</h2>
					<p className="text-sm font-semibold">
						{firstName} {lastName}
					</p>
					<p className="text-sm font-semibold">
						Member since: {dayjs(createdAt).format('DD/MM/YYYY')}
					</p>
				</div>
			</Title>

			<section className="mb-4 p-4 bg-white border">
				<Heading>
					<FiImage />
					<h3>Posts</h3>
					<p className="text-xl">({posts.length})</p>
				</Heading>

				{posts.length === 0 ? (
					<p className="text-slate-500">No posts to display</p>
				) : (
					<div className="flex gap-2 flex-col md:flex-row md:justify-evenly md:flex-wrap">
						{posts.map((post) => (
							<PostBox
								key={`user-profile-post-${post.id}`}
								post={post}
								className="w-full md:w-5/12"
							/>
						))}
					</div>
				)}
			</section>

			<section className="mb-8 p-4 bg-white border">
				<Heading>
					<FiMessageCircle />
					<h3>Recent comments</h3>
					<p className="text-xl">({comments.length})</p>
				</Heading>

				{comments.length === 0 ? (
					<p className="text-slate-500">No comments to display</p>
				) : (
					<div className="flex flex-col gap-4">
						{comments.map(({ id, text, likes, post, createdAt }) => (
							<div
								key={`user-profile-comment-${id}`}
								className="flex flex-col md:flex-row justify-between items-center py-2 px-4 border"
							>
								<div className="w-full md:w-auto flex flex-row justify-between md:flex-col mb-4 md:mb-0">
									<p className="mb-1 text-base md:text-lg">"{text}"</p>

									<p title="Likes" className="flex gap-1 items-center">
										<FiThumbsUp />
										{likes.length}
									</p>
								</div>

								<Link
									to={`/posts/${post.id}`}
									title="Go to post"
									className="flex flex-col md:flex-row gap-2 md:gap-4 items-center text-sm md:text-base"
								>
									<div className="flex flex-col items-center md:items-end text-slate-500">
										<p className="italic">{post.caption}</p>
										<p className="flex gap-2 items-center">
											<FiCalendar />
											{dayjs(createdAt).format('DD/MM/YYYY h:mm a')}
										</p>
									</div>
									<img
										src={post.imgUrl}
										alt={post.imgUrl}
										className="h-32 md:h-20 w-full md:w-36 object-cover"
									/>
								</Link>
							</div>
						))}
					</div>
				)}
			</section>
		</div>
	);
};

export default UserProfile;
