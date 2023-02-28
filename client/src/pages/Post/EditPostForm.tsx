import { useForm } from 'react-hook-form';
import GoogleAutocomplete from 'react-google-autocomplete';
import { toast } from 'react-toastify';
import { FiMapPin, FiEdit } from 'react-icons/fi';
import { Modal, Heading, ImageUpload } from '@/components';
import { useUserContext } from '@/contexts';
import { useUpdatePostMutation } from '@/graphql';
import { ChangeEvent } from 'react';

interface IEditPostFormProps {
	post: TPost;
	isOpen: boolean;
	onClose: () => void;
}

interface IEditPostForm {
	imgUrl: string;
	caption: string;
	location: string;
}

const EditPostForm = ({ post, isOpen, onClose }: IEditPostFormProps): React.ReactElement => {
	const { currentUser } = useUserContext();
	const { handleSubmit, setValue, register, watch } = useForm<IEditPostForm>({
		defaultValues: {
			imgUrl: post.imgUrl,
			caption: post.caption,
			location: post.location
		}
	});

	const { isLoading, updatePost } = useUpdatePostMutation();

	const onSubmit = async (data: IEditPostForm) => {
		try {
			const response = await updatePost(post.id, data);
			if (response.data.post) {
				onClose();
				toast('Successfully updated post');
			}
		} catch (e: unknown) {
			const error = e as ErrorEvent;
			console.log(error);
			toast('Unable to update post');
		}
	};

	const FORM_STATE = watch();
	const IS_FORM_VALID = Boolean(FORM_STATE.imgUrl) && Boolean(FORM_STATE.caption);

	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<Heading className="mb-6">
				<FiEdit />
				<h3>Edit post</h3>
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
					defaultValue={FORM_STATE.location}
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
		</Modal>
	);
};

export default EditPostForm;
