import { ReactElement, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

interface ITypographyProps {
	className?: string;
	children: ReactNode;
}

export const Title = ({ className, children }: ITypographyProps): ReactElement => (
	<div className={twMerge('flex gap-2 items-center mb-4 text-4xl font-bold', className)}>
		{children}
	</div>
);

export const Heading = ({ className, children }: ITypographyProps): ReactElement => (
	<div className={twMerge('flex gap-2 items-center mb-4 text-2xl font-semibold', className)}>
		{children}
	</div>
);
