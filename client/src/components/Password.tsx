import { ReactElement, useState } from 'react';
import { UseFormRegister } from 'react-hook-form';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { twMerge } from 'tailwind-merge';

interface IPasswordProps {
	placeholder: string;
	register: UseFormRegister<any>;
	name: string;
	className?: string;
}

const Password = ({ placeholder, register, name, className }: IPasswordProps): ReactElement => {
	const [visible, toggleVisible] = useState<boolean>(false);
	return (
		<div className={twMerge('relative', className)}>
			<input
				type={visible ? 'text' : 'password'}
				placeholder={placeholder}
				{...register(name, { required: true })}
				className="w-[stretch] pr-10"
			/>
			<span
				onClick={() => toggleVisible(!visible)}
				className="absolute top-3 right-2 text-2xl cursor-pointer"
			>
				{visible ? <FiEye /> : <FiEyeOff />}
			</span>
		</div>
	);
};

export default Password;
