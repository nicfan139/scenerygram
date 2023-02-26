import { ReactNode, ReactElement } from 'react';
import { twMerge } from 'tailwind-merge';
import { FiX } from 'react-icons/fi';

interface IModalProps {
	isOpen: boolean;
	onClose: () => void;
	children: ReactNode;
}

const Modal = ({ isOpen, onClose, children }: IModalProps): ReactElement => (
	<div
		className={twMerge(
			'-z-10 opacity-0 fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-black bg-opacity-50 transition-all',
			isOpen && 'z-50 opacity-100'
		)}
	>
		<div className="relative overflow-y-auto h-full max-h-screen md:h-auto w-full md:max-w-xl py-6 px-4 bg-white">
			<button
				type="button"
				onClick={onClose}
				className="absolute top-4 right-4 border-0 p-0 text-3xl md:text-2xl text-slate-900 bg-transparent"
			>
				<FiX />
			</button>

			{isOpen && children}
		</div>
	</div>
);

export default Modal;
