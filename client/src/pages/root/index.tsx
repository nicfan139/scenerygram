import { useEffect } from 'react';
import { useLocation, useNavigate, Outlet } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import { useUserContext } from '@/contexts';
import { getAccessToken } from '@/helpers';
import { client } from '@/graphql';
import Navbar from './Navbar';

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
			{currentUser?.id && <Navbar currentUser={currentUser} />}

			<main className="w-full md:max-w-screen-lg pt-24 md:pt-0 px-4 md:px-0 md:mx-auto">
				<Outlet />
			</main>
		</ApolloProvider>
	);
};

export default Root;
