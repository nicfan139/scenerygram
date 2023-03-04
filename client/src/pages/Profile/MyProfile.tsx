import { useState, useEffect } from 'react';
import { FiUser, FiImage } from 'react-icons/fi';
import dayjs from 'dayjs';
import { Loading, BackLink, Title, Heading, Avatar } from '@/components';
import { useUserContext } from '@/contexts';
import { useCurrentUserProfileQuery } from '@/graphql';
import { UpdateUserForm, UpdatePasswordForm, PostBox } from './components';

const MyProfile = (): React.ReactElement => {
	const { currentUser } = useUserContext();
	const { refetch } = useCurrentUserProfileQuery(currentUser?.id);

	const [userProfile, setUserProfle] = useState<TUser>();
	const [showUpdateUser, toggleUpdateUser] = useState<boolean>(false);
	const [showUpdatePassword, toggleUpdatePassword] = useState<boolean>(false);

	const getUser = async (id: string) => {
		const user = await refetch(id);
		setUserProfle(user);
	};

	useEffect(() => {
		if (currentUser) {
			getUser(currentUser.id);
		}
	}, [currentUser]);

	if (!userProfile) {
		return <Loading message="Loading profile" />;
	}

	const { id, firstName, lastName, username, avatarUrl, posts, createdAt, updatedAt } = userProfile;

	return (
		<div>
			<BackLink to={'/posts'} label="Back to posts" />

			<Title>
				<h2>My Profile</h2>
			</Title>

			<section className="h-auto w-full flex flex-col md:flex-row gap-8 md:gap-4 p-6 bg-white shadow-md">
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
							<Avatar imgUrl={avatarUrl} size="large" />

							<div>
								<p>ID: {id}</p>
								<p>Created on: {dayjs(createdAt).format('DD/MM/YYYY')}</p>
								<p>Last updated: {dayjs(updatedAt).format('DD/MM/YYYY')}</p>
							</div>
						</div>
						<div>
							<p>Username: {username}</p>
							<p>First name: {firstName}</p>
							<p>Last name: {lastName}</p>
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
						<p className="text-xl">({posts.length})</p>
					</Heading>

					{posts.length === 0 ? (
						<p className="text-slate-500 italic">No posts to display</p>
					) : (
						<div>
							{posts.map((post) => (
								<PostBox key={`my-profile-post-${post.id}`} post={post} />
							))}
						</div>
					)}
				</div>
			</section>
		</div>
	);
};

export default MyProfile;
