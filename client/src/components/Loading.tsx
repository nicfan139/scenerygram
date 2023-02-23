import { ReactElement } from 'react';
import { FiMap } from 'react-icons/fi';

export const Loading = (): ReactElement => (
	<div className="text-9xl animate-pulse">
		<FiMap />
	</div>
);

export const LoadingPage = ({ message }: { message?: string }): ReactElement => (
	<div className="z-50 fixed top-0 left-0 right-0 bottom-0 flex flex-col justify-center items-center">
		<Loading />
		{message && <p className="mt-4 text-2xl">{message}</p>}
	</div>
);
