import { ReactElement } from 'react';
import { FiMap } from 'react-icons/fi';

interface ILoadingProps {
	message?: string;
}

export const Loading = ({ message }: ILoadingProps): ReactElement => (
	<div className="w-full flex flex-col items-center">
		<div className="text-9xl animate-pulse">
			<FiMap />
		</div>
		{message && <p className="mt-2 text-xl">{message}</p>}
	</div>
);

export const LoadingScreen = ({ message }: ILoadingProps): ReactElement => (
	<div className="z-50 fixed top-0 left-0 right-0 bottom-0 flex flex-col justify-center items-center">
		<Loading />
		{message && <p className="mt-4 text-2xl">{message}</p>}
	</div>
);
