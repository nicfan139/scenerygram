import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiChevronLeft } from 'react-icons/fi';
import dayjs from 'dayjs';
import { Loading, Title, Modal, Heading, Avatar } from '@/components';
import { useUserContext } from '@/contexts';
import UpdateUserForm from './UpdateUserForm';
import UpdatePasswordForm from './UpdatePasswordForm';

const Profile = (): React.ReactElement => {
	const { currentUser } = useUserContext();

	const [showUpdateUser, toggleUpdateUser] = useState<boolean>(false);
	const [showUpdatePassword, toggleUpdatePassword] = useState<boolean>(false);

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

			<section className="h-auto w-full flex flex-col md:flex-row gap-8 md:gap-4 p-6 bg-white shadow-md">
				{currentUser ? (
					<>
						<Modal isOpen={showUpdateUser} onClose={() => toggleUpdateUser(false)}>
							<UpdateUserForm onClose={() => toggleUpdateUser(false)} />
						</Modal>

						<Modal isOpen={showUpdatePassword} onClose={() => toggleUpdatePassword(false)}>
							<UpdatePasswordForm />
						</Modal>

						<div className="w-full">
							<Heading>
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
								<h3>My posts</h3>
							</Heading>

							<div>
								{currentUser.posts.map(({ id, imgUrl, caption, createdAt }) => (
									<Link
										key={`profile-post-${id}`}
										to={`/posts/${id}`}
										className="flex justify-between items-center my-2 px-4 py-2 border"
									>
										<div className="flex flex-col">
											<label>{caption}</label>

											<label className="text-slate-500">
												{dayjs(createdAt).format('DD/MM/YYYY')}
											</label>
										</div>

										<img src={imgUrl} alt={imgUrl} className="h-24 w-40 object-cover" />
									</Link>
								))}
							</div>
						</div>
					</>
				) : (
					<Loading message="Loading profile" />
				)}
			</section>
		</div>
	);
};

export default Profile;
