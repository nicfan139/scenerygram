import { useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { Heading } from '@/components';
import { useUserContext } from '@/contexts';
import { useAddPostMutation } from '@/graphql';

interface IAddPostFormProps {
	onClose: () => void;
}

interface IAddPostForm {
	imgUrl: string;
	caption: string;
}

const AddPostForm = ({ onClose }: IAddPostFormProps): React.ReactElement => {
	const cloudinaryRef = useRef<unknown>();
	const widgetRef = useRef<unknown>();

	const { currentUser } = useUserContext();
	const { handleSubmit, setValue, register, watch } = useForm<IAddPostForm>();
	const { isLoading, addPost } = useAddPostMutation();

	useEffect(() => {
		const extendedWindow = window as unknown;
		cloudinaryRef.current = (extendedWindow as { cloudinary: unknown }).cloudinary;

		widgetRef.current = (
			cloudinaryRef as {
				current: {
					createUploadWidget: (
						params: {
							cloudName: string;
							uploadPreset: string;
							sources: string[];
							multiple: boolean;
							folder: string;
						},
						callback: (err: unknown, result: { event: 'success'; info: { url: string } }) => void
					) => void;
				};
			}
		).current.createUploadWidget(
			{
				cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME,
				uploadPreset: import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET_NAME,
				sources: ['local', 'url'],
				multiple: false,
				folder: import.meta.env.VITE_CLOUDINARY_FOLDER
			},
			(err, result) => {
				if (err) {
					console.log(err);
					toast('Unable to upload image');
				} else {
					if (result.event === 'success') {
						setValue('imgUrl', result.info.url);
					}
				}
			}
		);
	}, []);

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
			<Heading>
				<h3>Add new post</h3>
			</Heading>

			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="flex gap-2 items-center mb-4">
					<button
						type="button"
						onClick={() => (widgetRef as { current: { open: () => void } }).current.open()}
						className="py-1 px-2"
					>
						Upload
					</button>

					{FORM_STATE.imgUrl && <label className="italic font-semibold">Image uploaded!</label>}
				</div>

				<input
					placeholder="Enter a caption for your photo"
					{...register('caption', { required: true })}
					className="w-full mb-6"
				/>

				{FORM_STATE.imgUrl && FORM_STATE.caption && (
					<div className="mb-6">
						<h4 className="mb-2 font-bold text-lg">Post preview:</h4>

						<div className="p-4 border bg-slate-100">
							<h4 className="mb-2 text-xl font-bold">{FORM_STATE.caption}</h4>
							<img src={FORM_STATE.imgUrl} alt={FORM_STATE.imgUrl} className="mb-2" />
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
