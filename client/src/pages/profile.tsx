import { Link } from 'react-router-dom';
import { FiChevronLeft } from 'react-icons/fi';
import dayjs from 'dayjs';
import { Loading, Title, Heading, Avatar } from '@/components';
import { useUserContext } from '@/contexts';

const Profile = (): React.ReactElement => {
	const { currentUser } = useUserContext();

	return (
		<div>
			<div className="mb-4">
				<Link to="/posts" className="flex gap-1 items-center">
					<FiChevronLeft />
					Back to posts
				</Link>
			</div>

			<Title>
				<h2>My Profile</h2>
			</Title>

			<section className="h-auto w-full flex gap-4 p-6 bg-white shadow-md">
				{currentUser ? (
					<>
						<div className="w-full">
							<Heading>
								<h3>Details</h3>
							</Heading>

							<div>
								<div className="flex gap-4 items-center mb-4">
									<Avatar imgUrl={currentUser.avatarUrl} size="large" />

									<div>
										<p>ID: {currentUser.id}</p>
										<p>Created on: {dayjs(currentUser.createdAt).format('DD/MM/YYYY')}</p>
										<p>Last updated: {dayjs(currentUser.updatedAt).format('DD/MM/YYYY')}</p>
									</div>
								</div>
								<div>
									<p>Username: {currentUser.username}</p>
									<p>First name: {currentUser.firstName}</p>
									<p>Last name: {currentUser.lastName}</p>
								</div>
							</div>
						</div>

						<div className="w-full">
							<Heading>
								<h3>My posts</h3>
							</Heading>

							<div>
								{currentUser.posts.map(({ id, caption, createdAt }) => (
									<div
										key={`profile-post-${id}`}
										className="flex justify-between items-center py-2"
									>
										<Link to={`/posts/${id}`}>{caption}</Link>

										<label className="text-slate-500">
											{dayjs(createdAt).format('DD/MM/YYYY')}
										</label>
									</div>
								))}
							</div>
						</div>
					</>
				) : (
					<Loading />
				)}
			</section>
		</div>
	);
};

export default Profile;
