import { useEffect } from 'react';
import { useLocation, useNavigate, Outlet } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import { FiMap } from 'react-icons/fi';
import { useUserContext } from '@/contexts';
import { getAccessToken, handleLogout } from '@/helpers';
import { client } from '@/graphql';

const Root = (): React.ReactElement => {
	const location = useLocation();
	const navigate = useNavigate();
	const { currentUser } = useUserContext();

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
			{currentUser && (
				<nav className="z-40 fixed top-0 left-0 right-0 md:relative flex justify-between items-center md:justify-center md:mb-6 p-4 text-white bg-slate-900">
					<div className="flex gap-2 items-center text-3xl">
						<FiMap />
						<h1>Scenerygram</h1>
					</div>

					<div className="relative md:absolute md:top-3 md:right-4">
						<button
							type="button"
							onClick={handleLogout}
							className="border-white text-white hover:text-black hover:bg-white hover:border-white"
						>
							Logout
						</button>
					</div>
				</nav>
			)}

			<main className="w-full md:max-w-screen-lg pt-24 md:pt-0 px-4 md:px-0 md:mx-auto">
				<Outlet />
			</main>
		</ApolloProvider>
	);
};

export default Root;
