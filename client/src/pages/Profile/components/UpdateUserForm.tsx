import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { Modal, Avatar, Heading, ImageUpload } from '@/components';
import { useUserContext } from '@/contexts';
import { useUpdateUserMutaton } from '@/graphql';

interface IUpdateUserFormProps {
	isOpen: boolean;
	onClose: () => void;
}

interface IUpdateUserForm {
	firstName: string;
	lastName: string;
	username: string;
	avatarUrl: string;
}

const UpdateUserForm = ({ isOpen, onClose }: IUpdateUserFormProps): React.ReactElement => {
	const { currentUser, setCurrentUser } = useUserContext();
	const { handleSubmit, watch, register, setValue } = useForm<IUpdateUserForm>({
		defaultValues: {
			firstName: currentUser?.firstName,
			lastName: currentUser?.lastName,
			username: currentUser?.username,
			avatarUrl: currentUser?.avatarUrl
		}
	});
	const { isLoading, updateUser } = useUpdateUserMutaton();

	const onSubmit = async (data: IUpdateUserForm) => {
		try {
			const response = await updateUser(currentUser?.id as string, data);
			if (response.data.user) {
				setCurrentUser(response.data.user);
				onClose();
				toast('Successfully updated details');
			}
		} catch (e: unknown) {
			const error = e as ErrorEvent;
			console.log(error);
			toast('Unable to update details');
		}
	};

	const FORM_STATE = watch();

	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<Heading>
				<h4>Update your details</h4>
			</Heading>

			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="flex gap-4 items-center mb-4">
					<Avatar imgUrl={FORM_STATE.avatarUrl} size="large" />

					<div>
						{!FORM_STATE.avatarUrl && (
							<label className="italic">No image provided. Upload one!</label>
						)}
						<ImageUpload
							setUploadedImg={(imgUrl) => setValue('avatarUrl', imgUrl)}
							uploadedImg={FORM_STATE.avatarUrl}
						/>
					</div>
				</div>

				<div className="flex gap-2 flex-col md:flex-row justify-between">
					<div className="w-full flex flex-col">
						<label>First name</label>
						<input
							{...register('firstName', {
								required: true
							})}
						/>
					</div>

					<div className="w-full flex flex-col">
						<label>Last name</label>
						<input
							{...register('lastName', {
								required: true
							})}
						/>
					</div>
				</div>

				<div className="w-full flex flex-col">
					<label>Username</label>
					<input
						{...register('username', {
							required: true
						})}
					/>
				</div>

				<button type="submit" disabled={isLoading} className="my-2">
					Submit
				</button>
			</form>
		</Modal>
	);
};

export default UpdateUserForm;
