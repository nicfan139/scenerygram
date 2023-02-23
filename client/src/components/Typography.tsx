import { ReactElement, ReactNode } from 'react';

export const Title = ({ children }: { children: ReactNode }): ReactElement => (
	<div className="mb-4 text-4xl font-bold">{children}</div>
);
