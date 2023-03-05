import { useMutation } from 'react-query';

const BACKEND_API_URL = import.meta.env.VITE_BACKEND_API_URL;

interface IAuthLoginPayload {
	username: string;
	password: string;
}

export const useAuthLogin = () =>
	useMutation((payload: IAuthLoginPayload) => {
		return fetch(`${BACKEND_API_URL}/api/auth/login`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(payload)
		});
	});

interface IAuthValidateOtpPayload {
	accessToken: string;
	otp: string;
}

export const useAuthValidateOtp = () =>
	useMutation((payload: IAuthValidateOtpPayload) => {
		return fetch(`${BACKEND_API_URL}/api/auth/validate_otp`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(payload)
		});
	});

interface IAuthVerifyTokenPayload {
	accessToken: string;
}

export const useAuthValidateToken = () =>
	useMutation((payload: IAuthVerifyTokenPayload) => {
		return fetch(`${BACKEND_API_URL}/api/auth/validate_token`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(payload)
		});
	});
