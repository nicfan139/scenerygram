import { useState } from 'react';
import { FiUser, FiImage } from 'react-icons/fi';
import dayjs from 'dayjs';
import { Loading, BackLink, Title, Heading, Avatar } from '@/components';
import { useUserContext } from '@/contexts';
import { UpdateUserForm, UpdatePasswordForm, PostBox } from './components';

const MyProfile = (): React.ReactElement => {
	const { currentUser } = useUserContext();

	const [showUpdateUser, toggleUpdateUser] = useState<boolean>(false);
	const [showUpdatePassword, toggleUpdatePassword] = useState<boolean>(false);

	return (
		<div>
			<BackLink to={'/posts'} label="Back to posts" />

			<Title>
				<h2>My Profile</h2>
			</Title>

			<section className="h-auto w-full flex flex-col md:flex-row gap-8 md:gap-4 p-6 bg-white shadow-md">
				{currentUser ? (
					<>
						<UpdateUserForm isOpen={showUpdateUser} onClose={() => toggleUpdateUser(false)} />

						<UpdatePasswordForm
							isOpen={showUpdatePassword}
							onClose={() => toggleUpdatePassword(false)}
						/>

						<div className="w-full">
							<Heading>
								<FiUser />
								<h3>Details</h3>
							</Heading>

							<div className="border mb-4 p-4">
								<div className="flex gap-4 flex-col md:flex-row items-center mb-4">
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

							<div className="flex flex-col md:flex-row gap-2">
								<button type="button" onClick={() => toggleUpdateUser(true)}>
									Update details
								</button>

								<button type="button" onClick={() => toggleUpdatePassword(true)}>
									Update password
								</button>
							</div>
						</div>

						<div className="w-full">
							<Heading>
								<FiImage />
								<h3>My posts</h3>
								<p className="text-xl">({currentUser.posts.length})</p>
							</Heading>

							{currentUser.posts.length === 0 ? (
								<p className="text-slate-500 italic">No posts to display</p>
							) : (
								<div>
									{currentUser.posts.map((post) => (
										<PostBox key={`my-profile-post-${post.id}`} post={post} />
									))}
								</div>
							)}
						</div>
					</>
				) : (
					<Loading message="Loading profile" />
				)}
			</section>
		</div>
	);
};

export default MyProfile;
