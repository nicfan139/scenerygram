import { createContext, ReactElement, ReactNode, useState, useEffect, useContext } from 'react';
import { toast } from 'react-toastify';
import { LoadingScreen } from '@/components';
import { getAccessToken, handleLogout } from '@/helpers';
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
				setTimeout(() => {
					handleLogout();
				}, 3000);
				toast('Unable to validate credentials. Redirecting to login in a few moments');
			}
		} catch (e: unknown) {
			const error = e as ErrorEvent;
			console.log(error);
			toast('Unable to validate credentials');
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
		return <LoadingScreen message="Validating credentials" />;
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
