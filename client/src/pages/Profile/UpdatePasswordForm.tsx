import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { Heading } from '@/components';
import { useUpdateUserPasswordMutaton } from '@/graphql';
import { handleLogout } from '@/helpers';

interface IUpdatePasswordForm {
	currentPassword: string;
	newPassword: string;
	newPasswordConfirm: string;
}

const UpdatePasswordForm = (): React.ReactElement => {
	const { handleSubmit, register } = useForm<IUpdatePasswordForm>({
		defaultValues: {
			currentPassword: '',
			newPassword: '',
			newPasswordConfirm: ''
		}
	});
	const { isLoading, updatePassword } = useUpdateUserPasswordMutaton();

	const [updateSuccess, setUpdateSuccess] = useState<boolean>(false);

	const onSubmit = async (data: IUpdatePasswordForm) => {
		if (data.newPassword === data.newPasswordConfirm) {
			try {
				const response = await updatePassword({
					currentPassword: data.currentPassword,
					newPassword: data.newPassword
				});

				if (response.data.user) {
					setTimeout(() => {
						handleLogout();
					}, 4000);
					setUpdateSuccess(true);
				}
			} catch (e: unknown) {
				const error = e as ErrorEvent;
				console.log(error);
				toast('Unable to update password');
			}
		} else {
			toast('Please make sure your new passwords match before submitting');
		}
	};

	if (updateSuccess) {
		return (
			<div>
				<Heading>
					<h4>Password updated!</h4>
				</Heading>

				<p>For security, you will be automatically logged out in a few moments.</p>
			</div>
		);
	}

	return (
		<div>
			<Heading>
				<h4>Update your password</h4>
			</Heading>

			<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-start">
				<input
					type="password"
					placeholder="Current password"
					{...register('currentPassword', {
						required: true
					})}
					className="w-full md:w-3/4"
				/>

				<input
					type="password"
					placeholder="New password"
					{...register('newPassword', {
						required: true
					})}
					className="w-full md:w-3/4"
				/>

				<input
					type="password"
					placeholder="Confirm new password"
					{...register('newPasswordConfirm', {
						required: true
					})}
					className="w-full md:w-3/4"
				/>

				<button type="submit" disabled={isLoading} className="my-2">
					Submit
				</button>
			</form>
		</div>
	);
};

export default UpdatePasswordForm;
