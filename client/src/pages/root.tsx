import { useNavigate, Outlet } from 'react-router-dom';
import { FiMap } from 'react-icons/fi';
import { useUserContext } from '@/contexts';
import { getAccessToken, handleLogout } from '@/helpers';
import { useEffect } from 'react';

const Root = (): React.ReactElement => {
	const navigate = useNavigate();
	const { currentUser } = useUserContext();

	useEffect(() => {
		if (getAccessToken()) {
			navigate('/posts');
		}
	}, []);

	return (
		<>
			{currentUser && (
				<nav className="fixed top-0 left-0 right-0 md:relative flex justify-between items-center md:justify-center md:mb-6 p-4 text-white bg-slate-900">
					<div className="flex gap-4 items-center text-3xl">
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

			<div className="w-full md:max-w-screen-lg mt-24 md:mt-0 px-4 md:px-0 md:mx-auto">
				<Outlet />
			</div>
		</>
	);
};

export default Root;
