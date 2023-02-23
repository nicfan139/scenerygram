import { Outlet } from 'react-router-dom';
import { useUserContext } from '@/contexts';
import { handleLogout } from '@/helpers';

const Root = (): React.ReactElement => {
	const { currentUser } = useUserContext();

	if (!currentUser) {
		return <div>Loading...</div>;
	}

	return (
		<>
			<nav className="fixed top-0 left-0 right-0 md:relative flex justify-between items-center md:justify-center md:mb-6 p-4 text-white bg-slate-900">
				<h1 className="text-3xl">Scenerygram</h1>

				<div className="relative md:absolute md:top-3 md:right-4">
					<button type="button" onClick={handleLogout}>
						Logout
					</button>
				</div>
			</nav>

			<div className="w-full md:max-w-screen-lg mt-24 md:mt-0 md:mx-auto">
				<Outlet />
			</div>
		</>
	);
};

export default Root;
