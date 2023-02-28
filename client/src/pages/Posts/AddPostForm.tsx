import { useForm } from 'react-hook-form';
import GoogleAutocomplete from 'react-google-autocomplete';
import { toast } from 'react-toastify';
import { FiMapPin, FiPlus } from 'react-icons/fi';
import { Heading, ImageUpload } from '@/components';
import { useUserContext } from '@/contexts';
import { useAddPostMutation } from '@/graphql';
import { ChangeEvent } from 'react';

interface IAddPostFormProps {
	onClose: () => void;
}

interface IAddPostForm {
	imgUrl: string;
	caption: string;
	location: string;
}

const AddPostForm = ({ onClose }: IAddPostFormProps): React.ReactElement => {
	const { currentUser } = useUserContext();
	const { handleSubmit, setValue, register, watch } = useForm<IAddPostForm>();

	const { isLoading, addPost } = useAddPostMutation();

	const onSubmit = async (data: IAddPostForm) => {
		try {
			const response = await addPost(data);
			if (response.data.post) {
				onClose();
				toast('Successfully created new post');
			}
		} catch (e: unknown) {
			const error = e as ErrorEvent;
			console.log(error);
			toast('Unable to add comment');
		}
	};

	const FORM_STATE = watch();
	const IS_FORM_VALID = Boolean(FORM_STATE.imgUrl) && Boolean(FORM_STATE.caption);

	return (
		<div>
			<Heading className="mb-6">
				<FiPlus />
				<h3>Add new post</h3>
			</Heading>

			<form onSubmit={handleSubmit(onSubmit)}>
				<ImageUpload
					setUploadedImg={(imgUrl) => setValue('imgUrl', imgUrl)}
					uploadedImg={FORM_STATE.imgUrl}
				/>

				<input
					placeholder="Enter a caption for your photo"
					{...register('caption', { required: true })}
					className="w-full mb-4"
				/>

				<GoogleAutocomplete
					placeholder="Add a location (optional)"
					apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
					onPlaceSelected={(place: { formatted_address: string }) =>
						setValue('location', place.formatted_address)
					}
					onChange={(e: ChangeEvent<HTMLInputElement>) => setValue('location', e.target.value)}
					className="w-full mb-6"
				/>

				{FORM_STATE.imgUrl && FORM_STATE.caption && (
					<div className="mb-6">
						<h4 className="mb-2 font-bold text-lg">Post preview:</h4>

						<div className="p-4 border bg-slate-100">
							<h4 className="mb-2 text-xl font-bold">{FORM_STATE.caption}</h4>

							<img src={FORM_STATE.imgUrl} alt={FORM_STATE.imgUrl} className="mb-2" />

							{FORM_STATE.location && (
								<p className="flex gap-2 items-center mb-2">
									<FiMapPin />
									{FORM_STATE.location}
								</p>
							)}

							<p className="font-semibold">Posted by {currentUser?.username}</p>
						</div>
					</div>
				)}

				<button type="submit" disabled={!IS_FORM_VALID || isLoading} className="w-full">
					Submit
				</button>
			</form>
		</div>
	);
};

export default AddPostForm;
