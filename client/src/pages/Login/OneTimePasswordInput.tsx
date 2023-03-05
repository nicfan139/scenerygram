import { ReactElement, useState, ChangeEvent } from 'react';
import { toast } from 'react-toastify';
import { getAccessToken } from '@/helpers';
import { useAuthValidateOtp } from '@/hooks';

const OneTimePasswordInput = (): ReactElement => {
	const validateOtp = useAuthValidateOtp();

	const [otp, setOtp] = useState<string>('');

	const onSubmitOtp = async () => {
		try {
			const response = await validateOtp.mutateAsync({
				accessToken: getAccessToken() as string,
				otp
			});
			const data = await response.json();

			if (response.ok) {
				window.location.href = '/posts';
			} else {
				toast(data.errorMessage);
			}
		} catch (e: unknown) {
			const error = e as ErrorEvent;
			console.log(error);
			toast('Unable to validate one-time password');
		}
	};

	return (
		<div className="flex flex-col">
			<p className="mb-4">Check your email for the one-time password, and enter it below:</p>

			<input
				type="text"
				maxLength={6}
				onChange={(e: ChangeEvent<HTMLInputElement>) => setOtp(e.target.value)}
			/>

			<button type="button" onClick={onSubmitOtp} disabled={validateOtp.isLoading}>
				{validateOtp.isLoading ? 'Validating...' : 'Submit'}
			</button>
		</div>
	);
};

export default OneTimePasswordInput;
