import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { FiMap } from 'react-icons/fi';
import { Fade } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import { Title, Loading, Password } from '@/components';
import { useScreenContext } from '@/contexts';
import { useAuthLogin } from '@/hooks';
import OneTimePasswordInput from './OneTimePasswordInput';

interface ILoginForm {
	username: string;
	password: string;
}

const images = [
	'https://images.unsplash.com/photo-1509721434272-b79147e0e708?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80',
	'https://images.unsplash.com/photo-1506710507565-203b9f24669b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1536&q=80',
	'https://images.unsplash.com/photo-1536987333706-fc9adfb10d91?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80',
	'https://images.unsplash.com/photo-1592685444739-bcb532f511f8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
	'https://images.unsplash.com/photo-1616282169510-05ba664ee212?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1555&q=80'
];

const Login = (): React.ReactElement => {
	const { isDesktop } = useScreenContext();
	const { handleSubmit, register } = useForm<ILoginForm>({
		defaultValues: {
			username: '',
			password: ''
		}
	});
	const authLogin = useAuthLogin();

	const [otpEnabled, setOtpEnabled] = useState<boolean>(false);

	const onSubmit = async (form: ILoginForm) => {
		try {
			const response = await authLogin.mutateAsync(form);
			const data = await response.json();
			if (response.ok) {
				localStorage.setItem('scenerygram-accessToken', data.accessToken);
				if (data.otpEnabled) {
					setOtpEnabled(true);
				} else {
					window.location.href = '/posts';
				}
			} else {
				toast(data.errorMessage);
			}
		} catch (e: unknown) {
			const error = e as ErrorEvent;
			console.log(error);
			toast('Unable to login');
		}
	};

	return (
		<div className="w-screen flex">
			<div className="z-30 h-screen w-full md:w-[400px] p-4 border bg-slate-100">
				{authLogin.isLoading ? (
					<Loading message="Logging you in" />
				) : (
					<>
						<div className="flex gap-2 items-center mb-8">
							<div className="text-4xl">
								<FiMap />
							</div>
							<label className="text-2xl">Scenerygram</label>
						</div>

						<Title>
							<h1>Login</h1>
						</Title>

						{otpEnabled ? (
							<OneTimePasswordInput />
						) : (
							<>
								<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col mb-4">
									<input
										type="text"
										placeholder="Enter username"
										{...register('username', {
											required: true
										})}
									/>

									<Password placeholder="Enter password" register={register} name="password" />

									<button type="submit" className="text-xl font-semibold">
										Submit
									</button>
								</form>

								<p className="my-8">
									Don't have an account? <Link to="/register">Register here</Link>
								</p>
							</>
						)}
					</>
				)}
			</div>

			{isDesktop && (
				<Fade autoplay duration={3000} arrows={false} cssClass="h-screen w-[calc(100vw-400px)]">
					{images.map((imgUrl) => (
						<img key={imgUrl} src={imgUrl} alt={imgUrl} className="h-screen w-full object-cover" />
					))}
				</Fade>
			)}
		</div>
	);
};

export default Login;
