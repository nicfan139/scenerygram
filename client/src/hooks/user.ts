import { useMutation } from 'react-query';

const BACKEND_API_URL = import.meta.env.VITE_BACKEND_API_URL;

interface IUserCreatePayload {
	firstName: string;
	lastName: string;
	username: string;
	password: string;
}

export const useUserCreate = () =>
	useMutation((payload: IUserCreatePayload) => {
		return fetch(`${BACKEND_API_URL}/api/users/register`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(payload)
		});
	});
