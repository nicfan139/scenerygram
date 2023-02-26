import { useEffect } from 'react';
import { useLocation, useNavigate, Outlet, Link } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import { FiMap, FiChevronRight } from 'react-icons/fi';
import { useScreenContext, useUserContext } from '@/contexts';
import { getAccessToken, handleLogout } from '@/helpers';
import { client } from '@/graphql';
import { Avatar } from '@/components';

const Root = (): React.ReactElement => {
	const location = useLocation();
	const navigate = useNavigate();
	const { currentUser } = useUserContext();
	const { isDesktop } = useScreenContext();

	useEffect(() => {
		if (getAccessToken()) {
			if (location.pathname === '/') {
				navigate('/posts');
			}
		} else {
			navigate('/login');
		}
	}, []);

	return (
		<ApolloProvider client={client}>
			{currentUser?.id && (
				<nav className="z-40 fixed top-0 left-0 right-0 md:relative flex justify-between items-center md:justify-center md:mb-6 p-4 text-white bg-slate-900">
					<Link
						to="/posts"
						className="flex gap-2 items-center text-3xl text-white hover:text-white"
					>
						<FiMap />
						<h1>Scenerygram</h1>
					</Link>

					{isDesktop && (
						<div className="absolute top-3 right-4 flex gap-6 items-center">
							<Link to="/profile" className="flex gap-2 items-center text-white hover:text-white">
								<Avatar imgUrl={currentUser.avatarUrl} size="small" className="border-white" />

								<div className="flex flex-col">
									<label>{currentUser.username}</label>
									<label className="flex items-center -ml-1 text-sm">
										<FiChevronRight />
										My Profile
									</label>
								</div>
							</Link>

							<button
								type="button"
								onClick={handleLogout}
								className="border-white text-white hover:text-black hover:bg-white hover:border-white"
							>
								Logout
							</button>
						</div>
					)}
				</nav>
			)}

			<main className="w-full md:max-w-screen-lg pt-24 md:pt-0 px-4 md:px-0 md:mx-auto">
				<Outlet />
			</main>
		</ApolloProvider>
	);
};

export default Root;
