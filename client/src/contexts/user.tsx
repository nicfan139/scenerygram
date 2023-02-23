import { createContext, ReactElement, ReactNode, useState, useEffect, useContext } from 'react';
import { LoadingPage } from '@/components';
import { getAccessToken } from '@/helpers';
import { useAuthValidateToken } from '@/hooks';

const ACCESS_TOKEN = getAccessToken();

interface IUserContext {
	currentUser?: TUser;
	setCurrentUser: (user: TUser) => void;
}

const UserContext = createContext<IUserContext>({
	currentUser: undefined,
	setCurrentUser: () => {}
});

export const UserContextProvider = ({ children }: { children: ReactNode }): ReactElement => {
	const validateToken = useAuthValidateToken();

	const [currentUser, setCurrentUser] = useState<TUser>();

	const verifyToken = async () => {
		try {
			const response = await validateToken.mutateAsync({ token: ACCESS_TOKEN as string });
			if (response.ok) {
				const data = await response.json();
				setCurrentUser(data.user);
			} else {
				alert('Unable to validate credentials. Redirecting to login');
			}
		} catch (e: unknown) {
			const error = e as ErrorEvent;
			console.log(error);
		}
	};

	useEffect(() => {
		if (ACCESS_TOKEN) {
			verifyToken();
		} else {
			if (window.location.pathname !== '/login') {
				window.location.href = '/login';
			}
		}
	}, []);

	if (validateToken.isLoading) {
		return <LoadingPage message="Validating credentials" />;
	}

	console.log('currentUser: ', currentUser);

	return (
		<UserContext.Provider
			value={{
				currentUser,
				setCurrentUser
			}}
		>
			{children}
		</UserContext.Provider>
	);
};

export const useUserContext = () => useContext(UserContext);
