import { FiUser } from 'react-icons/fi';
import { twMerge } from 'tailwind-merge';

interface IAvatarProps {
	imgUrl?: string;
	size: 'small' | 'large';
	className?: string;
}

const Avatar = ({ imgUrl, size, className }: IAvatarProps): React.ReactElement => {
	if (imgUrl) {
		return (
			<img
				src={imgUrl}
				alt={imgUrl}
				className={twMerge(
					'bg-white border rounded-full',
					size === 'small' && 'h-10 w-10',
					size === 'large' && 'h-20 w-20',
					className
				)}
			/>
		);
	}

	return (
		<div
			className={twMerge(
				'flex justify-center items-center border-2 border-slate-900 rounded-full',
				size === 'small' && 'h-10 w-10 text-3xl',
				size === 'large' && 'h-20 w-20 text-6xl',
				className
			)}
		>
			<FiUser />
		</div>
	);
};

export default Avatar;
