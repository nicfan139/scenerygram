import { useForm } from 'react-hook-form';
import { Title } from '@/components';
import { useAuthLogin } from '@/hooks';

interface ILoginForm {
	username: string;
	password: string;
}

const Login = (): React.ReactElement => {
	const { handleSubmit, watch, register } = useForm<ILoginForm>({
		defaultValues: {
			username: '',
			password: ''
		}
	});
	const authLogin = useAuthLogin();

	const onSubmit = async (data: ILoginForm) => {
		try {
			const response = await authLogin.mutateAsync(data);
			if (response.ok) {
				const data = await response.json();
				console.log(data);
				localStorage.setItem('scenerygram-accessToken', data.accessToken);
				window.location.href = '/posts';
			} else {
				alert('Unable to login :(');
			}
		} catch (e: unknown) {
			const error = e as ErrorEvent;
			console.log(error);
		}
	};

	const FORM_STATE = watch();

	return (
		<div className="w-screen flex justify-start">
			<div className="h-screen w-full max-w-sm p-4 border bg-slate-100">
				<Title>
					<h1>Login</h1>
				</Title>

				<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col mb-4">
					<input
						type="text"
						placeholder="Enter username"
						{...register('username', {
							required: true
						})}
					/>

					<input
						type="password"
						placeholder="Enter password"
						{...register('password', {
							required: true
						})}
					/>

					<button type="submit" className="text-xl font-semibold">
						Submit
					</button>
				</form>
			</div>

			<div className="h-screen w-full bg-blue-400"></div>
		</div>
	);
};

export default Login;
