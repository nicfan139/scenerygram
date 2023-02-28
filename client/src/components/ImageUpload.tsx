import { ReactElement, useRef, useEffect } from 'react';
import { toast } from 'react-toastify';
import { FiUpload } from 'react-icons/fi';

interface IImageUploadProps {
	setUploadedImg: (imgUrl: string) => void;
	uploadedImg: string;
}

const ImageUpload = ({ setUploadedImg, uploadedImg }: IImageUploadProps): ReactElement => {
	const cloudinaryRef = useRef<unknown>();
	const widgetRef = useRef<unknown>();

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
							maxImageFileSize: number;
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
				maxImageFileSize: 1000000,
				folder: import.meta.env.VITE_CLOUDINARY_FOLDER
			},
			(err, result) => {
				if (err) {
					console.log(err);
					toast('Unable to upload image');
				} else {
					if (result.event === 'success') {
						setUploadedImg(result.info.url);
					}
				}
			}
		);
	}, []);

	return (
		<div className="flex gap-2 items-center mb-4">
			<button
				type="button"
				onClick={() => (widgetRef as { current: { open: () => void } }).current.open()}
				className="flex gap-2 items-center py-1 px-2"
			>
				<FiUpload />
				Upload
			</button>

			{Boolean(uploadedImg) && <label className="italic font-semibold">Image uploaded!</label>}
		</div>
	);
};

export default ImageUpload;
