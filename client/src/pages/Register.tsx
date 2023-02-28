import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { FiMap } from 'react-icons/fi';
import { Loading, Title, Password } from '@/components';
import { useScreenContext } from '@/contexts';
import { useUserCreate } from '@/hooks';
import { Link } from 'react-router-dom';

interface IRegisterForm {
	firstName: string;
	lastName: string;
	username: string;
	password: string;
}

const BACKGROUND_URL =
	'https://images.unsplash.com/photo-1500964757637-c85e8a162699?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1503&q=80';

const Register = (): React.ReactElement => {
	const { isDesktop } = useScreenContext();
	const { handleSubmit, register } = useForm<IRegisterForm>({
		defaultValues: {
			firstName: '',
			lastName: '',
			username: '',
			password: ''
		}
	});
	const userCreate = useUserCreate();

	const [registerSuccess, setRegisterSuccess] = useState<boolean>(false);

	const onSubmit = async (formData: IRegisterForm) => {
		try {
			const response = await userCreate.mutateAsync(formData);
			const data = await response.json();
			if (response.ok && response.status === 201) {
				setTimeout(() => {
					window.location.href = '/posts';
				}, 4000);
				setRegisterSuccess(true);
			} else {
				toast(`Unable to register new user: ${data.errorMessage}`);
			}
		} catch (e: unknown) {
			const error = e as ErrorEvent;
			console.log(error);
			toast('Unable to register new user');
		}
	};

	return (
		<div className="w-screen flex">
			{isDesktop && (
				<img
					src={BACKGROUND_URL}
					alt={BACKGROUND_URL}
					className="h-screen w-[calc(100vw-524px)] object-cover"
				/>
			)}

			<div className="z-30 h-screen w-full md:w-[524px] p-4 border bg-slate-100">
				{userCreate.isLoading ? (
					<Loading message="Registering your details" />
				) : (
					<>
						<div className="flex gap-2 items-center mb-8">
							<div className="text-4xl">
								<FiMap />
							</div>
							<label className="text-2xl">Scenerygram</label>
						</div>

						{registerSuccess ? (
							<>
								<Title>
									<h1>Successfully registered!</h1>
								</Title>

								<p>You will be automatically redirected to the login page in a few moments.</p>
							</>
						) : (
							<>
								<Title>
									<h1>Register new account</h1>
								</Title>

								<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col mb-4">
									<div className="flex flex-col md:flex-row md:gap-4">
										<input
											type="text"
											placeholder="First name"
											{...register('firstName', {
												required: true
											})}
											className="w-full"
										/>

										<input
											type="text"
											placeholder="Last name"
											{...register('lastName', {
												required: true
											})}
											className="w-full"
										/>
									</div>

									<input
										type="text"
										placeholder="Username"
										{...register('username', {
											required: true
										})}
									/>

									<Password placeholder="Password" register={register} name="password" />

									<button type="submit" className="text-xl font-semibold">
										Submit
									</button>
								</form>

								<p className="my-8">
									Already have an account? <Link to="/login">Login here</Link>
								</p>
							</>
						)}
					</>
				)}
			</div>
		</div>
	);
};

export default Register;
